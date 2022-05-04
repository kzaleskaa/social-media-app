from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from .models import User


class CurrrentUser(APIView):
    """Manage the data of the logged in user."""

    def get(self, request):
        """Get basic information about user - e.g. first and last name, nickname."""

        user = request.user

        serialized = UserSerializer(user)

        return Response(serialized.data)


class UserByNickname(APIView):
    def get(self, request, nickname):
        try:
            user = User.objects.get(nickname=nickname)

            serialized = UserSerializer(user)

            return Response({'user': serialized.data}, status=status.HTTP_200_OK)
        except Exception as error:
            return Response({'error': 'User with this nickname does not exist.'}, status=status.HTTP_400_BAD_REQUEST)