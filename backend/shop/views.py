# ─── shop/views.py — نسخه نهایی و تمیز ───────────────────

import requests
from rest_framework import viewsets, filters, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from django.http import JsonResponse

from .models import Product, Category, Order, Comment, Blog, ContactMessage
from .serializers import (
    ProductSerializer, CategorySerializer, CommentSerializer,
    BlogSerializer, ContactMessageSerializer
)

# ─────────────────────────────────────────────────────────
# ۱. محصولات و دسته‌بندی
# ─────────────────────────────────────────────────────────
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['category', 'stock']
    search_fields = ['name', 'description']

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

# ─────────────────────────────────────────────────────────
# ۲. نظرات
# ─────────────────────────────────────────────────────────
class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

# ─────────────────────────────────────────────────────────
# ۳. بلاگ
# ─────────────────────────────────────────────────────────
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer

# ─────────────────────────────────────────────────────────
# ۴. تماس با ما
# ─────────────────────────────────────────────────────────
class ContactMessageViewSet(viewsets.ModelViewSet):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer

# ─────────────────────────────────────────────────────────
# ۵. پیامک (کاوه‌نگار)
# ─────────────────────────────────────────────────────────
KAVENEGAR_API_KEY = '676A586A6A456A4C4F4333355876434A6C622F2B4263636D55422B7739552B697A7276616D4A71582B64303D'
SENDER_NUMBER = '2000660110'

def send_sms(receptor, message):
    url = f'https://api.kavenegar.com/v1/{KAVENEGAR_API_KEY}/sms/send.json'
    try:
        response = requests.post(url, data={
            'receptor': receptor,
            'sender': SENDER_NUMBER,
            'message': message,
        })
        return response.json()
    except Exception as e:
        print(f'خطا در ارسال پیامک: {e}')
        return None

# ─────────────────────────────────────────────────────────
# ۶. ثبت‌نام با پیامک
# ─────────────────────────────────────────────────────────
@api_view(['POST'])
def register_user(request):
    username = request.data.get('username', '').strip()
    password = request.data.get('password', '').strip()
    phone    = request.data.get('phone', '').strip()

    if not username or not password:
        return Response({'error': 'نام کاربری و رمز عبور الزامی است'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'این نام کاربری قبلاً ثبت شده است'}, status=400)

    User.objects.create_user(username=username, password=password)

    if phone:
        send_sms(phone, f'سلام {username} عزیز!\nثبت‌نام شما در روبیک مارکت با موفقیت انجام شد. خوش آمدید!')

    return Response({'message': 'ثبت‌نام موفق!'}, status=201)

# ─────────────────────────────────────────────────────────
# ۷. ورود
# ─────────────────────────────────────────────────────────
@api_view(['POST'])
def login_user(request):
    user = authenticate(
        username=request.data.get('username'),
        password=request.data.get('password')
    )
    if user:
        return Response({'message': 'ورود موفق', 'username': user.username, 'user_id': user.id})
    return Response({'error': 'نام کاربری یا رمز عبور اشتباه است'}, status=401)

# ─────────────────────────────────────────────────────────
# ۸. سفارش
# ─────────────────────────────────────────────────────────
@api_view(['POST'])
def create_order(request):
    data = request.data
    order = Order.objects.create(
        phone=data['phone'],
        address=data['address'],
        total_price=data['total_price'],
        items=data['items']
    )
    send_sms(data['phone'], f'سفارش #{order.id} با موفقیت ثبت شد. روبیک مارکت')
    return Response({'message': 'موفق', 'order_id': order.id})

# ─────────────────────────────────────────────────────────
# ۹. درگاه پرداخت زرین‌پال
# ─────────────────────────────────────────────────────────
ZARINPAL_MERCHANT = 'YOUR-MERCHANT-ID'  # ← بعداً از پنل زرین‌پال جایگزین کن
ZARINPAL_REQUEST  = 'https://api.zarinpal.com/pg/v4/payment/request.json'
ZARINPAL_VERIFY   = 'https://api.zarinpal.com/pg/v4/payment/verify.json'
ZARINPAL_STARTPAY = 'https://www.zarinpal.com/pg/StartPay/{}'
CALLBACK_URL      = 'http://127.0.0.1:8000/api/payment/verify/'

@api_view(['POST'])
def payment_request(request):
    order_id    = request.data.get('order_id')
    total_price = request.data.get('total_price')

    response = requests.post(ZARINPAL_REQUEST, json={
        'merchant_id':  ZARINPAL_MERCHANT,
        'amount':       int(total_price) * 10,
        'description':  f'پرداخت سفارش #{order_id}',
        'callback_url': CALLBACK_URL,
    })
    result = response.json()

    if result['data']['code'] == 100:
        authority = result['data']['authority']
        Order.objects.filter(id=order_id).update(authority=authority)
        return JsonResponse({'pay_url': ZARINPAL_STARTPAY.format(authority)})
    return JsonResponse({'error': 'خطا در اتصال به درگاه'}, status=400)

def payment_verify(request):
    authority = request.GET.get('Authority')
    status    = request.GET.get('Status')

    if status != 'OK':
        return redirect('http://localhost:5173/thankyou?status=failed')

    order = Order.objects.filter(authority=authority).first()
    if not order:
        return redirect('http://localhost:5173/thankyou?status=failed')

    response = requests.post(ZARINPAL_VERIFY, json={
        'merchant_id': ZARINPAL_MERCHANT,
        'amount':      int(order.total_price) * 10,
        'authority':   authority,
    })
    result = response.json()

    if result['data']['code'] in [100, 101]:
        ref_id = result['data']['ref_id']
        order.status = 'paid'
        order.ref_id = str(ref_id)
        order.save()
        return redirect(f'http://localhost:5173/thankyou?status=success&ref_id={ref_id}')
    return redirect('http://localhost:5173/thankyou?status=failed')