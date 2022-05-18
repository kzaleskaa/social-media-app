from rest_framework import serializers
from .models import Post, Comment
from users.models import User
from users.serializers import UserSerializer
# create serializers from models


class PostsSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Post
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = ("id", "user", "date", "text")
