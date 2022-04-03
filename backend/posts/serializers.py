from rest_framework import serializers
from .models import Post


# create serializers from models

class PostsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
