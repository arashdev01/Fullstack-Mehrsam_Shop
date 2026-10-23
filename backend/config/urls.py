from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.views.static import serve
from .views import robots_txt, sitemap_xml


urlpatterns = [
    path('sitemap.xml', sitemap_xml),
    path('robots.txt', robots_txt),
    path('admin/', admin.site.urls),
    path('api/', include('shop.urls')),

    # سرو کردن فایل‌های Media در محیط محلی
    path('media/<path:path>', serve, {'document_root': settings.MEDIA_ROOT}),
]