from django.urls import path

from .views import ManagePostsViev

urlpatterns = [
    path('', ManagePostsViev.as_view()),
]
