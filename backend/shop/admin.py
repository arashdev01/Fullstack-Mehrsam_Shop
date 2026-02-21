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
