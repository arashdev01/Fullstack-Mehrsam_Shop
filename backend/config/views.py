from django.http import HttpResponse
from django.shortcuts import render
from shop.models import Blog, Product

SITE_URL = 'https://mehrsamjeans.ir'

def home(request):
    return render(request, 'index.html')

def sitemap_xml(request):
    static_paths = ('', 'products', 'about', 'contact', 'blog', 'faq')
    entries = [f'<url><loc>{SITE_URL}/{path}</loc></url>' for path in static_paths]
    entries += [f'<url><loc>{SITE_URL}/product/{item.pk}</loc></url>' for item in Product.objects.only('id')]
    entries += [f'<url><loc>{SITE_URL}/blog/{item.pk}</loc></url>' for item in Blog.objects.only('id')]
    body = '<?xml version="1.0" encoding="UTF-8"?>' + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ''.join(entries) + '</urlset>'
    return HttpResponse(body, content_type='application/xml; charset=utf-8')

def robots_txt(request):
    body = 'User-agent: *\nAllow: /\nSitemap: https://mehrsamjeans.ir/sitemap.xml\n'
    return HttpResponse(body, content_type='text/plain; charset=utf-8')
