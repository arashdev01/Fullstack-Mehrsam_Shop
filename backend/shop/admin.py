from django.contrib import admin
from django.utils.safestring import mark_safe
from .models import Product, Category, Order, ProductImage, Comment, Blog, ContactMessage


# این بخش باید دقیقاً همین شکلی باشد تا کادرها ظاهر شوند
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 3


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['show_image', 'name', 'category', 'price', 'stock']
    list_display_links = ['name', 'show_image']

    # این همان خط جادویی است که گالری را می‌آورد:
    inlines = [ProductImageInline]

    def show_image(self, obj):
        if obj.image:
            return mark_safe(
                f'<img src="{obj.image.url}" width="50" height="50" style="object-fit:cover; border-radius:5px;" />')
        return "No Image"

    show_image.short_description = 'تصویر'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'subject', 'created_at') # در لیست اصلی این‌ها رو نشون بده
    readonly_fields = ('created_at',)

admin.site.register(Order)
admin.site.register(Comment)
admin.site.register(Blog)


from .models import SiteContent


@admin.register(SiteContent)
class SiteContentAdmin(admin.ModelAdmin):
    fieldsets = (
        ('اسلایدر و بنرهای کناری', {'fields': ('slider_slide1_button', 'slider_slide1_image', 'slider_slide2_button', 'slider_slide2_image', 'slider_side1_button', 'slider_side1_image', 'slider_side2_button', 'slider_side2_image',)}),
        ('بخش معرفی صفحه اصلی', {'fields': ('hero_title', 'hero_title_highlight', 'hero_description', 'hero_button', 'hero_background_image',)}),
        ('بنرهای تخفیف', {'fields': ('offer1_badge', 'offer1_title', 'offer1_subtitle', 'offer1_image', 'offer2_badge', 'offer2_title', 'offer2_subtitle', 'offer2_image',)}),
        ('مزیت‌های فروشگاه', {'fields': ('benefit1_label', 'benefit1_image', 'benefit2_label', 'benefit2_image', 'benefit3_label', 'benefit3_image', 'benefit4_label', 'benefit4_image',)}),
        ('برندها', {'fields': ('vendor_title', 'vendor1_name', 'vendor1_image', 'vendor2_name', 'vendor2_image', 'vendor3_name', 'vendor3_image', 'vendor4_name', 'vendor4_image', 'vendor5_name', 'vendor5_image',)}),
        ('درباره ما', {'fields': ('about_page_title', 'about_page_subtitle', 'about_intro_title', 'about_paragraph1', 'about_paragraph2', 'about_paragraph3', 'about_image', 'about_team_title', 'about_team_subtitle', 'team1_name', 'team1_role', 'team1_description', 'team1_image', 'team2_name', 'team2_role', 'team2_description', 'team2_image', 'team3_name', 'team3_role', 'team3_description', 'team3_image', 'team4_name', 'team4_role', 'team4_description', 'team4_image',)}),
        ('تماس با ما', {'fields': ('contact_page_title', 'contact_page_subtitle', 'contact_address_label', 'contact_address', 'contact_phone_label', 'contact_phone1', 'contact_phone2', 'contact_email_label', 'contact_email', 'contact_form_title', 'contact_form_intro', 'contact_map_url',)}),
        ('خبرنامه و مقالات', {'fields': ('newsletter_title', 'newsletter_description', 'newsletter_placeholder', 'newsletter_button', 'latest_posts_title',)}),
    )
    save_on_top = True

    def has_add_permission(self, request):
        return False

    def has_delete_permission(self, request, obj=None):
        return False

    def get_queryset(self, request):
        return super().get_queryset(request).filter(pk=1)

    def has_change_permission(self, request, obj=None):
        if obj is not None and obj.pk != 1:
            return False
        return super().has_change_permission(request, obj)
