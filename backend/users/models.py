from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from posts.models import Post


class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email=self.normalize_email(email), **extra_fields)

        user.set_password(password)
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_active', True)
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        user = self.create_user(email, password=password, **extra_fields)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    nickname = models.CharField(max_length=255, unique=True, default=None)
    image = models.ImageField(upload_to="user_images", null=True, default="user_images/avatar.png")

    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'nickname']

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.nickname

    @property
    def posts_number(self):
        result = Post.objects.filter(user=self.pk)
        counter = result.count()
        return counter

    @property
    def followers(self):
        result = Follower.objects.filter(user_id=self.pk)
        counter = result.count()
        return counter

    @property
    def following(self):
        result = Follower.objects.filter(follower_id=self.pk)
        counter = result.count()
        return counter


class Follower(models.Model):
    follower_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="follower")
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, null=False, related_name="user")
