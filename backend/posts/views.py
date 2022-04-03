from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .serializers import PostsSerializer


class ManagePostsViev(APIView):
    """View to list all user's post or add new post."""

    def get(self, request):
        """Get all user's post ordered by date."""

        try:
            user = request.user

            if not user.is_active:
                return Response({'error': 'User does not have necessary permission to see posts.'},
                                status=status.HTTP_403_FORBIDDEN)

            # sort user's post
            posts = Post.objects.order_by("-date")

            #
            posts = PostsSerializer(posts, many=True)

            return Response({"posts": posts.data}, status=status.HTTP_200_OK)

        except:
            return Response({'error': 'Something went wrong when listing posts.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        """Create new post with user's image and description."""

        try:
            user = request.user

            if not user.is_active:
                return Response({'error': 'User does not have necessary permission to create new post.'},
                                status=status.HTTP_403_FORBIDDEN)

            data = request.data

            image = data["image"]
            description = data["description"]

            # create new post
            Post.objects.create(user=user, image=image, description=description)

            return Response({'success': 'New post was successfully created.'},
                            status=status.HTTP_201_CREATED)

        except:
            return Response({'error': 'Something went wrong when creating post.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)

