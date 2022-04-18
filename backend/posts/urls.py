from django.urls import path

from .views import ManagePostsViev, ManagePostDetailViev, ManageComments

urlpatterns = [
    path('', ManagePostsViev.as_view()),
    path('<int:pk>', ManagePostDetailViev.as_view()),
    path('comments/<int:post_id>', ManageComments.as_view())
]
