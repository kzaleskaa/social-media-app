from django.urls import path

from .views import CurrrentUser, UserByNickname, ManageFollowers

urlpatterns = [
    path('me/', CurrrentUser.as_view()),
    path('<str:nickname>', UserByNickname.as_view()),
    path('followers/<int:user_id>', ManageFollowers.as_view())
]
