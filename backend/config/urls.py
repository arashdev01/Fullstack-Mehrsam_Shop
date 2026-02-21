from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers # این رو اضافه کن
from shop import views # این رو اضافه کن
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# ۱. روتر رو اینجا تعریف کن
router = routers.DefaultRouter()
router.register(r'products', views.ProductViewSet)
router.register(r'categories', views.CategoryViewSet)
router.register(r'comments', views.CommentViewSet) # اضافه کردن بخش کامنت

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), # روتر رو اینجا وصل کن
    path('api/create-order/', views.create_order), # آدرس ثبت سفارش
    path('api/register/', views.register_user),
    path('api/token/', TokenObtainPairView.as_view()),      # ← اضافه کن
    path('api/token/refresh/', TokenRefreshView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)