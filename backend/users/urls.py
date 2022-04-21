from django.urls import path

from .views import CurrrentUser

urlpatterns = [
    path('me/', CurrrentUser.as_view()),
]
