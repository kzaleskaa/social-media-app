from django.contrib import admin
from posts.models import Post, Comment, Like

# Register models


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'date', 'likes_number', 'comments_number']
    list_filter = ['user', 'date']


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'post', 'date']
    list_filter = ['user', 'post','date']


@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ['id', 'user_id', 'post']
    list_filter = ['user_id', 'post']
