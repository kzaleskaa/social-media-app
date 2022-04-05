from django.contrib import admin
from posts.models import Post

# Register models

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'date')
    list_filter = ('user', 'date')
