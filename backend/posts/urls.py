from django.urls import path

from .views import ManagePostsViev, ManagePostDetailViev

urlpatterns = [
    path('', ManagePostsViev.as_view()),
    path('<int:pk>', ManagePostDetailViev.as_view())
]
