# Shop API views. Payment is intentionally gated until the database and merchant setup are ready.




import os
from decimal import Decimal

import requests
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.shortcuts import redirect
from rest_framework import filters, status, viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend


from .models import Blog, Category, Comment, ContactMessage, Newsletter, Order, Product

from .serializers import BlogSerializer, CategorySerializer, CommentSerializer, ContactMessageSerializer, ProductSerializer


# Public catalog endpoints are read-only; writes belong in Django admin.
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'category__slug', 'stock']

    search_fields = ['name', 'description']
    http_method_names = ['get', 'head', 'options']



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

    http_method_names = ['get', 'head', 'options']

class CommentViewSet(viewsets.ModelViewSet):


    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    http_method_names = ['get', 'post', 'head', 'options']


class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

    http_method_names = ['get', 'head', 'options']

class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.none()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post', 'options']


# SMS credentials must be provided through the deployment environment.
KAVENEGAR_API_KEY = os.environ.get('KAVENEGAR_API_KEY', '')
SENDER_NUMBER = os.environ.get('KAVENEGAR_SENDER_NUMBER', '2000660110')


def send_sms(receptor, message):
    if not KAVENEGAR_API_KEY or not receptor:
        return None
    url = f'https://api.kavenegar.com/v1/{KAVENEGAR_API_KEY}/sms/send.json'
    try:

        response = requests.post(url, data={'receptor': receptor, 'sender': SENDER_NUMBER, 'message': message}, timeout=8)
        response.raise_for_status()
        return response.json()
    except (requests.RequestException, ValueError) as error:
        print(f'خطا در ارسال پیامک: {error}')
        return None


@api_view(['GET'])
def site_settings(request):
    return Response({'site_name': 'مهرسام جینز', 'logo': '/images/logo.png', 'phone': os.environ.get('PUBLIC_CONTACT_PHONE', '')})


@api_view(['POST'])
def newsletter_subscribe(request):
    email = str(request.data.get('email', '')).strip().lower()
    try:
        validate_email(email)
    except ValidationError:

        return Response({'error': 'ایمیل معتبر وارد کنید.'}, status=status.HTTP_400_BAD_REQUEST)
    _, created = Newsletter.objects.get_or_create(email=email)
    message = 'عضویت در خبرنامه با موفقیت ثبت شد.' if created else 'این ایمیل قبلاً عضو خبرنامه شده است.'

    return Response({'message': message}, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

# Registration
@api_view(['POST'])
def register_user(request):
    username = str(request.data.get('username', '')).strip()
    password = str(request.data.get('password', ''))
    phone = str(request.data.get('phone', '')).strip()

    if not username or not password:
        return Response({'error': 'نام کاربری و رمز عبور الزامی است'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'این نام کاربری قبلاً ثبت شده است'}, status=status.HTTP_400_BAD_REQUEST)

    User.objects.create_user(username=username, password=password)
    if phone:
        send_sms(phone, f'سلام {username} عزیز!\nثبت‌نام شما در مهرسام جینز ثبت شد.')
    return Response({'message': 'ثبت‌نام موفق!'}, status=status.HTTP_201_CREATED)

# Login
@api_view(['POST'])
def login_user(request):
    user = authenticate(username=request.data.get('username'), password=request.data.get('password'))

    if user:
        return Response({'message': 'ورود موفق', 'username': user.username, 'user_id': user.id})
    return Response({'error': 'نام کاربری یا رمز عبور اشتباه است'}, status=status.HTTP_401_UNAUTHORIZED)


# Orders: all prices are recalculated from trusted database products, never from browser prices.
@api_view(['POST'])
def create_order(request):
    phone = str(request.data.get('phone', '')).strip()
    address = str(request.data.get('address', '')).strip()
    items = request.data.get('items')
    if not phone or len(phone) > 15 or not address or not isinstance(items, list) or not items:
        return Response({'error': 'اطلاعات تماس، نشانی و اقلام سفارش الزامی است.'}, status=status.HTTP_400_BAD_REQUEST)
    quantities = {}
    for item in items:

        if not isinstance(item, dict):
            return Response({'error': 'ساختار اقلام سفارش معتبر نیست.'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            product_id, quantity = int(item.get('product')), int(item.get('quantity'))
        except (TypeError, ValueError):
            return Response({'error': 'شناسه محصول یا تعداد معتبر نیست.'}, status=status.HTTP_400_BAD_REQUEST)
        if product_id < 1 or quantity < 1:

            return Response({'error': 'شناسه محصول و تعداد باید مثبت باشند.'}, status=status.HTTP_400_BAD_REQUEST)
        quantities[product_id] = quantities.get(product_id, 0) + quantity
    order_items, total_price = [], Decimal('0')
    for product_id, quantity in quantities.items():
        try:
            product = Product.objects.get(pk=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'یکی از محصولات دیگر موجود نیست.'}, status=status.HTTP_400_BAD_REQUEST)
        if quantity > product.stock:
            return Response({'error': f'موجودی «{product.name}» برای این تعداد کافی نیست.'}, status=status.HTTP_400_BAD_REQUEST)
        total_price += product.price * quantity

        order_items.append({'product': product.id, 'name': product.name, 'quantity': quantity, 'price': str(product.price), 'image': product.image.url if product.image else ''})
    order = Order.objects.create(phone=phone, address=address, total_price=total_price, items=order_items)
    send_sms(phone, f'سفارش #{order.id} در مهرسام جینز ثبت شد و در انتظار تکمیل است.')
    return Response({'message': 'سفارش ثبت شد', 'order_id': order.id, 'total_price': str(order.total_price), 'status': order.status}, status=status.HTTP_201_CREATED)


# Payment is disabled until a valid merchant ID and persisted authority/ref_id fields are added via a migration.
@api_view(['POST'])
def payment_request(request):
    return Response({'error': 'درگاه پرداخت آنلاین هنوز پیکربندی نشده است؛ سفارش را پرداخت‌شده تلقی نکنید.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)

def payment_verify(request):



    return redirect('https://mehrsamjeans.ir/thankyou?status=failed')