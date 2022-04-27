from django.contrib import admin
from posts.models import Post, Comment, Like

# Register models


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'date')
    list_filter = ('user', 'date')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'date')
    list_filter = ('user', 'date')

admin.site.register(Like)