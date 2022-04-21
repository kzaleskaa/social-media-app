from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Post, Comment
from .serializers import PostsSerializer, CommentSerializer


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
            posts = Post.objects.filter(user=user).order_by("-date")

            posts = PostsSerializer(posts, many=True)

            return Response({"posts": posts.data}, status=status.HTTP_200_OK)

        except Exception as error:
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

        except Exception as error:
            return Response({'error': 'Something went wrong when creating post.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ManagePostDetailViev(APIView):
    """Update or delete post."""

    def put(self, request, pk: int):
        """Update existing post based on pk."""

        try:
            user = request.user

            if not user.is_active:
                return Response({'error': 'User does not have necessary permission to update post.'},
                                status=status.HTTP_403_FORBIDDEN)

            data = request.data
            description = data["description"]

            Post.objects.filter(pk=pk).update(description=description)

            return Response({'success': 'Post updated successfully.'}, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({'error': 'Something went wrong when updating post.'}, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        """Delete existing post based on pk."""

        try:
            user = request.user

            if not user.is_active:
                return Response({'error': 'User does not have necessary permission to update post.'},
                                status=status.HTTP_403_FORBIDDEN)

            post = Post.objects.filter(pk=pk).delete()

            return Response({'success': 'Post deleted successfully.'}, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({'error': 'Something went wrong when deleting post.'}, status=status.HTTP_400_BAD_REQUEST)


class ManageComments(APIView):
    """Create/delete comments to post."""

    def post(self, request, post_id):
        """Create new comment to post."""

        try:
            user = request.user
            data = request.data

            comment_text = data["text"]

            try:
                post = Post.objects.get(pk=post_id)
            except Exception as error:
                return Response({'error': 'Post does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

            Comment.objects.create(user=user, text=comment_text, post=post)

            return Response({'success': 'New comment was successfully created.'},
                            status=status.HTTP_201_CREATED)

        except Exception as error:
            return Response({'error': 'Something went wrong when adding post.'}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request, post_id):
        try:
            user = request.user

            try:
                post = Post.objects.get(pk=post_id)
            except Exception as error:
                return Response({'error': 'Post does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

            # sort comments
            comments = Comment.objects.filter(post=post).order_by("-date")

            comments = CommentSerializer(comments, many=True)

            return Response({"comments": comments.data}, status=status.HTTP_200_OK)

        except Exception as error:
            return Response({'error': 'Something went wrong when listing comments.'},
                            status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ManageComment(APIView):
    """Actions for the selected comment - based on id of comment."""

    def delete(self, request, comment_id):
        """Delete existing comment based on comment_id."""

        try:
            user = request.user
            comment = Comment.objects.get(pk=comment_id)

            if user == comment.user:
                comment.delete()
                return Response({'success': 'Post deleted successfully.'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'User can not delete this comment.'}, status=status.HTTP_400_BAD_REQUEST)

        except Exception as error:
            return Response({'error': 'Something went wrong when deleting post.'}, status=status.HTTP_400_BAD_REQUEST)
