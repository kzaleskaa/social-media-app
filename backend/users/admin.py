from django.contrib import admin
from users.models import User, Follower

# Register models


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id', 'full_name', 'nickname', 'email', 'last_login', 'posts_number', 'followers', 'following']
    list_filter = ['is_staff', 'is_active']
    search_fields = ['email', 'nickname']


admin.site.register(Follower)



