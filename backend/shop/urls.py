
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import views

router = DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'comments', views.CommentViewSet)
router.register(r'blogs', views.BlogViewSet)
router.register(r'contact', views.ContactMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),

    # کاربران
    path('register/', views.register_user),
    path('login/', views.login_user),

    # JWT توکن
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),

    # سفارش
    path('orders/', views.create_order),

    # درگاه پرداخت
    path('payment/request/', views.payment_request),
    path('payment/verify/', views.payment_verify),
]