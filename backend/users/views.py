from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response


class Temp(APIView):
    def get(self, request):
        output = [{"user": "Kasia"}]
        return Response(output)


def index(request):
    return HttpResponse("Hello, user.")