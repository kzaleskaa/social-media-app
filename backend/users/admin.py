from django.contrib import admin
from users.models import User

# Register models

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email', 'last_login']
    list_filter = ['is_staff', 'is_active']
    search_fields = ['email']


