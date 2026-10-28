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

class SiteContent(models.Model):
    """Singleton settings for editable, fixed text and image slots on the public site."""
    id = models.PositiveSmallIntegerField(primary_key=True, default=1, editable=False)
    slider_slide1_button = models.CharField(max_length=255, blank=True, default="ورود به فروشگاه")
    slider_slide2_button = models.CharField(max_length=255, blank=True, default="دیدن محصولات")
    slider_side1_button = models.CharField(max_length=255, blank=True, default="خرید عمده")
    slider_side2_button = models.CharField(max_length=255, blank=True, default="خرید تکی")
    slider_slide1_image = models.ImageField(upload_to='site-content/', blank=True)
    slider_slide2_image = models.ImageField(upload_to='site-content/', blank=True)
    slider_side1_image = models.ImageField(upload_to='site-content/', blank=True)
    slider_side2_image = models.ImageField(upload_to='site-content/', blank=True)
    hero_title = models.CharField(max_length=255, blank=True, default="کالکشن")
    hero_title_highlight = models.CharField(max_length=255, blank=True, default="اختصاصی")
    hero_description = models.CharField(max_length=255, blank=True, default="محصولات را ورق بزنید...")
    hero_button = models.CharField(max_length=255, blank=True, default="خرید سریع")
    hero_background_image = models.ImageField(upload_to='site-content/', blank=True)
    offer1_badge = models.CharField(max_length=255, blank=True, default="تخفیف ۲۰٪")
    offer1_title = models.CharField(max_length=255, blank=True, default="فروش ویژه عید نوروز")
    offer1_subtitle = models.CharField(max_length=255, blank=True, default="انواع پوشاک مـردانه")
    offer1_image = models.ImageField(upload_to='site-content/', blank=True)
    offer2_badge = models.CharField(max_length=255, blank=True, default="تخفیف ویژه برای")
    offer2_title = models.CharField(max_length=255, blank=True, default="بانـوان")
    offer2_subtitle = models.CharField(max_length=255, blank=True, default="انواع پوشاک زنـانه")
    offer2_image = models.ImageField(upload_to='site-content/', blank=True)
    benefit1_label = models.CharField(max_length=255, blank=True, default="پشتیبانی کامل")
    benefit1_image = models.ImageField(upload_to='site-content/', blank=True)
    benefit2_label = models.CharField(max_length=255, blank=True, default="اصالت کالا")
    benefit2_image = models.ImageField(upload_to='site-content/', blank=True)
    benefit3_label = models.CharField(max_length=255, blank=True, default="بازگشت وجه")
    benefit3_image = models.ImageField(upload_to='site-content/', blank=True)
    benefit4_label = models.CharField(max_length=255, blank=True, default="ارسال رایگان")
    benefit4_image = models.ImageField(upload_to='site-content/', blank=True)
    vendor_title = models.CharField(max_length=255, blank=True, default="برندهای موجود")
    vendor1_name = models.CharField(max_length=255, blank=True, default="برند ۱")
    vendor1_image = models.ImageField(upload_to='site-content/', blank=True)
    vendor2_name = models.CharField(max_length=255, blank=True, default="برند ۲")
    vendor2_image = models.ImageField(upload_to='site-content/', blank=True)
    vendor3_name = models.CharField(max_length=255, blank=True, default="برند ۳")
    vendor3_image = models.ImageField(upload_to='site-content/', blank=True)
    vendor4_name = models.CharField(max_length=255, blank=True, default="برند ۴")
    vendor4_image = models.ImageField(upload_to='site-content/', blank=True)
    vendor5_name = models.CharField(max_length=255, blank=True, default="برند ۵")
    vendor5_image = models.ImageField(upload_to='site-content/', blank=True)
    about_page_title = models.CharField(max_length=255, blank=True, default="درباره ما")
    about_page_subtitle = models.CharField(max_length=255, blank=True, default="با ما بیشتر آشنا شوید.")
    about_intro_title = models.CharField(max_length=255, blank=True, default="معرفی فروشگاه")
    about_paragraph1 = models.TextField(blank=True, default="روبیک مارکت یک فروشگاه اینترنتی است که با هدف ارائه بهترین محصولات با مناسب‌ترین قیمت فعالیت می‌کند.")
    about_paragraph2 = models.TextField(blank=True, default="ما در روبیک مارکت همواره در تلاش هستیم تا بهترین تجربه خرید آنلاین را برای مشتریان خود فراهم کنیم.")
    about_paragraph3 = models.TextField(blank=True, default="کیفیت، سرعت و اعتماد سه اصل اساسی فروشگاه ما هستند. با ما همراه باشید.")
    about_image = models.ImageField(upload_to='site-content/', blank=True)
    about_team_title = models.CharField(max_length=255, blank=True, default="تیم ما")
    about_team_subtitle = models.CharField(max_length=255, blank=True, default="با تیم ما بیشتر آشنا شوید.")
    team1_name = models.CharField(max_length=255, blank=True, default="مجید کیانی")
    team1_role = models.CharField(max_length=255, blank=True, default="مدیر عامل")
    team1_description = models.TextField(blank=True, default="به عنوان مدیر عامل در تیم فعالیت دارد.")
    team1_image = models.ImageField(upload_to='site-content/', blank=True)
    team2_name = models.CharField(max_length=255, blank=True, default="پوریا طلایی")
    team2_role = models.CharField(max_length=255, blank=True, default="برنامه نویس")
    team2_description = models.TextField(blank=True, default="به عنوان برنامه نویس در تیم فعالیت دارد.")
    team2_image = models.ImageField(upload_to='site-content/', blank=True)
    team3_name = models.CharField(max_length=255, blank=True, default="امیر جاوید")
    team3_role = models.CharField(max_length=255, blank=True, default="تولید کننده محتوا")
    team3_description = models.TextField(blank=True, default="به عنوان تولید کننده محتوا در تیم فعالیت دارد.")
    team3_image = models.ImageField(upload_to='site-content/', blank=True)
    team4_name = models.CharField(max_length=255, blank=True, default="وحید کمالی")
    team4_role = models.CharField(max_length=255, blank=True, default="دیجیتال مارکتر")
    team4_description = models.TextField(blank=True, default="به عنوان دیجیتال مارکتر در تیم فعالیت دارد.")
    team4_image = models.ImageField(upload_to='site-content/', blank=True)
    contact_page_title = models.CharField(max_length=255, blank=True, default="تماس با ما")
    contact_page_subtitle = models.CharField(max_length=255, blank=True, default="با ما در ارتباط باشید.")
    contact_address_label = models.CharField(max_length=255, blank=True, default="آدرس فروشگاه:")
    contact_address = models.CharField(max_length=255, blank=True, default="ایران، تهران، جردن")
    contact_phone_label = models.CharField(max_length=255, blank=True, default="تلفن تماس:")
    contact_phone1 = models.CharField(max_length=255, blank=True, default="02112345678")
    contact_phone2 = models.CharField(max_length=255, blank=True, default="09351234567")
    contact_email_label = models.CharField(max_length=255, blank=True, default="پست الکترونیک:")
    contact_email = models.CharField(max_length=255, blank=True, default="info@rubik.com")
    contact_form_title = models.CharField(max_length=255, blank=True, default="ارسال پیام")
    contact_form_intro = models.TextField(blank=True, default="نظرات، پیشنهادات و انتقادات سازنده خود را از طریق فرم زیر با ما در میان بگذارید.")
    contact_map_url = models.URLField(max_length=500, blank=True, default="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13877.455761926274!2d52.5714962!3d29.5931048!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xcc3a67871fb07f53!2z2YjYqCDYsdmI2KjbjNqpIC0gV2ViUnViaWs!5e0!3m2!1sen!2sca!4v1600581121318!5m2!1sen!2sca")
    newsletter_title = models.CharField(max_length=255, blank=True, default="عضویت در خبرنامه")
    newsletter_description = models.TextField(blank=True, default="از جدیدترین تخفیف‌ها و محصولات زودتر از همه باخبر شوید.")
    newsletter_placeholder = models.CharField(max_length=255, blank=True, default="ایمیل")
    newsletter_button = models.CharField(max_length=255, blank=True, default="عضویت")
    latest_posts_title = models.CharField(max_length=255, blank=True, default="جدیدترین مقالات آموزشی")

    class Meta:
        verbose_name = 'محتوای قابل ویرایش سایت'
        verbose_name_plural = 'محتوای قابل ویرایش سایت'

    def save(self, *args, **kwargs):
        self.pk = 1
        super().save(*args, **kwargs)

    def __str__(self):
        return 'تنظیمات محتوای سایت'
