from rest_framework import serializers
from .models import Post, Comment
from users.models import User

# create serializers from models


class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ("id", "user", "date", "text")
        depth = 1
