from django.db import models
# from users.models import User
from django.core.validators import MinLengthValidator


class Post(models.Model):
    """Class represents user's post."""

    user = models.ForeignKey("users.User", on_delete=models.CASCADE, null=False)
    image = models.ImageField(upload_to="posts_images", null=False)
    description = models.CharField(max_length=100, blank=True, default='')
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user}, {self.date}"


class Comment(models.Model):
    """Class represents comment in database."""

    user = models.ForeignKey("users.User", on_delete=models.CASCADE, null=False)
    date = models.DateField(auto_now=True)
    text = models.TextField(validators=[MinLengthValidator(1)])
    post = models.ForeignKey(Post, on_delete=models.CASCADE)


class Like(models.Model):
    """Class represents likes of user posts."""

    user_id = models.ForeignKey("users.User", on_delete=models.CASCADE, null=False)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, null=False)

