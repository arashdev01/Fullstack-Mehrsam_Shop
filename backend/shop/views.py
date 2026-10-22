import os
import requests
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view, authentication_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.shortcuts import redirect
import secrets
from .models import Product, Category, Order, Comment, Blog, ContactMessage, Newsletter
from .serializers import ProductSerializer, CategorySerializer, CommentSerializer, BlogSerializer, ContactMessageSerializer
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
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    http_method_names = ['post', 'head', 'options']
KAVENEGAR_API_KEY = os.getenv('KAVENEGAR_API_KEY', '')
def send_sms(receptor, message):
    if not KAVENEGAR_API_KEY: return None
    try:
        response = requests.post(f'https://api.kavenegar.com/v1/{KAVENEGAR_API_KEY}/sms/send.json', data={'receptor': receptor, 'sender': os.getenv('KAVENEGAR_SENDER_NUMBER', '2000660110'), 'message': message}, timeout=10)
        response.raise_for_status()
        return response.json()
    except requests.RequestException as error:
        print(f'خطا در ارسال پیامک: {error}'); return None
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()
    phone    = request.data.get('phone', '').strip()
    if not username or not password:
        return Response({'error': 'نام کاربری و رمز عبور الزامی است'}, status=400)
    if get_user_model().objects.filter(username=username).exists():
        return Response({'error': 'این نام کاربری قبلاً ثبت شده است'}, status=400)
    get_user_model().objects.create_user(username=username, password=password)
    if phone:
        send_sms(phone, f'سلام {username} عزیز!\nثبت‌نام شما در مهرسام جینز با موفقیت انجام شد. خوش آمدید!')
    return Response({'message': 'ثبت‌نام موفق!'}, status=201)
@api_view(['POST'])
def login_user(request):
    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )
    if user:
        return Response({'message': 'ورود موفق', 'username': user.username, 'user_id': user.id})
    return Response({'error': 'نام کاربری یا رمز عبور اشتباه است'}, status=401)
@api_view(['POST'])
def subscribe_newsletter(request):
    email = str(request.data.get('email', '')).strip().lower()
    if len(email) > 254 or email.count('@') != 1: return Response({'error': 'ایمیل معتبر وارد کنید.'}, status=400)
    _, created = Newsletter.objects.get_or_create(email=email)
    return Response({'message': 'عضویت انجام شد.'}, status=201 if created else 200)
# Order creation and gateway callbacks

@api_view(['GET', 'POST'])
@authentication_classes([JWTAuthentication])
def create_order(request):
    if request.method == 'GET':
        if not request.user.is_authenticated: return Response({'error': 'برای مشاهده سفارش‌ها وارد حساب کاربری شوید.'}, status=status.HTTP_401_UNAUTHORIZED)
        orders = Order.objects.filter(items__user_id=request.user.id).order_by('-created_at')
        return Response([{'id': order.id, 'created_at': order.created_at.isoformat(), 'status': order.status, 'total_price': str(order.total_price), 'items': order.items.get('products', []) if isinstance(order.items, dict) else order.items} for order in orders])
    data = request.data
    phone = str(data.get('phone', '')).strip()
    address = str(data.get('address', '')).strip()
    submitted_items = data.get('items')
    if not phone or len(phone) > 15 or not address:
        return Response({'error': 'شماره تلفن و نشانی معتبر الزامی است.'}, status=status.HTTP_400_BAD_REQUEST)
    if not isinstance(submitted_items, list) or not submitted_items:
        return Response({'error': 'سبد خرید خالی یا نامعتبر است.'}, status=status.HTTP_400_BAD_REQUEST)
    quantities = {}
    for item in submitted_items:
        try:
            product_id = int(item.get('product', item.get('id')))
            quantity = int(item.get('quantity', 0))
        except (AttributeError, TypeError, ValueError):
            return Response({'error': 'اطلاعات یکی از محصولات نامعتبر است.'}, status=status.HTTP_400_BAD_REQUEST)
        if product_id < 1 or quantity < 1:
            return Response({'error': 'شناسه و تعداد محصول باید معتبر باشند.'}, status=status.HTTP_400_BAD_REQUEST)
        quantities[product_id] = quantities.get(product_id, 0) + quantity
    products = Product.objects.in_bulk(quantities)
    if len(products) != len(quantities):
        return Response({'error': 'یکی از محصولات دیگر در دسترس نیست.'}, status=status.HTTP_400_BAD_REQUEST)
    normalized_items = []
    total_price = 0
    for product_id, quantity in quantities.items():
        product = products[product_id]
        if quantity > product.stock:
            return Response({'error': 'تعداد درخواستی از موجودی محصول بیشتر است.'}, status=status.HTTP_400_BAD_REQUEST)
        normalized_items.append({'product': product.id, 'name': product.name, 'quantity': quantity, 'price': str(product.price), 'image': product.image.url if product.image else ''})
        total_price += product.price * quantity
    order_token = secrets.token_urlsafe(32)
    order = Order.objects.create(phone=phone, address=address, total_price=total_price, items={'products': normalized_items, 'delivery_date': data.get('delivery_date', ''), 'user_id': request.user.id if request.user.is_authenticated else None, 'payment': {'authority': '', 'ref_id': '', 'order_token': order_token}})
    send_sms(phone, 'سفارش شماره {} در مهرسام جینز ثبت شد و در انتظار پرداخت است.'.format(order.id))
    return Response({'message': 'سفارش ثبت شد.', 'order_id': order.id, 'order_token': order_token, 'total_price': str(total_price), 'status': order.status}, status=status.HTTP_201_CREATED)
ZARINPAL_MERCHANT = os.getenv('ZARINPAL_MERCHANT_ID', '')
ZARINPAL_REQUEST = 'https://api.zarinpal.com/pg/v4/payment/request.json'
ZARINPAL_VERIFY = 'https://api.zarinpal.com/pg/v4/payment/verify.json'
ZARINPAL_STARTPAY = 'https://www.zarinpal.com/pg/StartPay/{}'
FRONTEND_URL = os.getenv('FRONTEND_URL', 'https://mehrsamjeans.ir').rstrip('/')
CALLBACK_URL = os.getenv('PAYMENT_CALLBACK_URL', 'https://mehrsamjeans.ir/api/payment/verify/')
@api_view(['POST'])
def payment_request(request):
    if not ZARINPAL_MERCHANT:
        return Response({'error': 'درگاه پرداخت پیکربندی نشده است.'}, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    try:
        order_id = int(request.data.get('order_id'))
    except (TypeError, ValueError):
        return Response({'error': 'شماره سفارش نامعتبر است.'}, status=status.HTTP_400_BAD_REQUEST)
    order = Order.objects.filter(id=order_id, status='pending').first()
    if not order or not isinstance(order.items, dict):
        return Response({'error': 'سفارش در انتظار پرداخت پیدا نشد.'}, status=status.HTTP_404_NOT_FOUND)
    payment = order.items.get('payment') or {}
    supplied_token = str(request.data.get('order_token', ''))
    if not payment.get('order_token') or not secrets.compare_digest(str(payment['order_token']), supplied_token):
        return Response({'error': 'مجوز پرداخت این سفارش معتبر نیست.'}, status=status.HTTP_403_FORBIDDEN)
    try:
        response = requests.post(ZARINPAL_REQUEST, json={'merchant_id': ZARINPAL_MERCHANT, 'amount': int(order.total_price) * 10, 'description': 'پرداخت سفارش شماره {}'.format(order.id), 'callback_url': CALLBACK_URL}, timeout=12)
        response.raise_for_status()
        result = response.json()
    except (requests.RequestException, ValueError):
        return Response({'error': 'ارتباط با درگاه پرداخت برقرار نشد.'}, status=status.HTTP_502_BAD_GATEWAY)
    result_data = result.get('data') or {}
    authority = result_data.get('authority')
    if result_data.get('code') != 100 or not authority:
        return Response({'error': 'درگاه پرداخت درخواست را نپذیرفت.'}, status=status.HTTP_502_BAD_GATEWAY)
    order.items['payment']['authority'] = authority
    order.save(update_fields=['items'])
    return Response({'pay_url': ZARINPAL_STARTPAY.format(authority)})
def payment_verify(request):
    authority = request.GET.get('Authority', '')
    gateway_status = request.GET.get('Status', '')
    failed_url = FRONTEND_URL + '/thankyou?status=failed'
    if gateway_status != 'OK' or not authority:
        return redirect(failed_url)
    order = Order.objects.filter(items__payment__authority=authority).first()
    if not order or not isinstance(order.items, dict):
        return redirect(failed_url)
    payment = order.items.get('payment') or {}
    if order.status == 'paid' and payment.get('ref_id'):
        return redirect(FRONTEND_URL + '/thankyou?status=success&ref_id=' + str(payment['ref_id']) + '&order_id=' + str(order.id))
    try:
        response = requests.post(ZARINPAL_VERIFY, json={'merchant_id': ZARINPAL_MERCHANT, 'amount': int(order.total_price) * 10, 'authority': authority}, timeout=12)
        response.raise_for_status()
        result = response.json()
    except (requests.RequestException, ValueError):
        return redirect(failed_url)
    result_data = result.get('data') or {}
    ref_id = result_data.get('ref_id')
    if result_data.get('code') not in (100, 101) or not ref_id:
        return redirect(failed_url)
    payment['ref_id'] = str(ref_id)
    order.items['payment'] = payment
    order.status = 'paid'
    order.save(update_fields=['items', 'status'])
    return redirect(FRONTEND_URL + '/thankyou?status=success&ref_id=' + str(ref_id) + '&order_id=' + str(order.id))