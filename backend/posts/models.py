from django.db import models
from users.models import User


class Post(models.Model):
    """Class represent user's post."""

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)
    image = models.ImageField(upload_to="posts_images", null=False)
    description = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField(auto_now=True)

