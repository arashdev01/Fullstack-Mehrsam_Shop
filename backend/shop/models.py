from django.db import models

# ۱. محصولات و دسته‌بندی فروشگاه
class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    def __str__(self): return self.name

class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    price = models.DecimalField(max_digits=10, decimal_places=0)
    image = models.ImageField(upload_to='products/')
    stock = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.name

class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/gallery/')

# ۲. نظرات و سفارشات
class Comment(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='comments')
    name = models.CharField(max_length=100)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Order(models.Model):
    phone = models.CharField(max_length=15)
    address = models.TextField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    items = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, default='pending')

# ۳. بخش وبلاگ (اصلاح شده)
class BlogCategory(models.Model):
    name = models.CharField(max_length=100)
    def __str__(self): return self.name

class Blog(models.Model):
    category = models.ForeignKey(BlogCategory, on_delete=models.SET_NULL, null=True, blank=True, related_name='blogs')
    title = models.CharField(max_length=200)
    image = models.ImageField(upload_to='blog/')
    content = models.TextField()
    author = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.title

# ۴. سایر موارد (تماس، خبرنامه، تیم)
class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email_or_phone = models.CharField(max_length=100)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

class TeamMember(models.Model):
    name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    image = models.ImageField(upload_to='team/')
    bio = models.TextField(blank=True)
    def __str__(self): return self.name