from django.urls import path

from .views import CurrrentUser, UserByNickname

urlpatterns = [
    path('me/', CurrrentUser.as_view()),
    path('<str:nickname>', UserByNickname.as_view())
]
