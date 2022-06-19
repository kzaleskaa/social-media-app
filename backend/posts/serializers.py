from rest_framework import serializers
from .models import Post, Comment
from users.serializers import UserSerializer


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
