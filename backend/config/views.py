from django.http import HttpResponse
from shop import models
def sitemap(request):
    base = 'https://mehrsamjeans.ir'; paths = [base + path for path in ('/', '/products', '/shop', '/about', '/contact', '/faq', '/blog')] + [base + '/product/' + str(item.pk) for item in models.Product.objects.only('pk')] + [base + '/category/' + item.slug for item in models.Category.objects.only('slug')] + [base + '/blog/' + str(item.pk) for item in models.Blog.objects.only('pk')]
    return HttpResponse('<?xml version="1.0" encoding="UTF-8"?>' + '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + ''.join('<url><loc>' + path + '</loc></url>' for path in paths) + '</urlset>', content_type='application/xml')
