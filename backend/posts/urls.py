from django.urls import path

from .views import ManagePostsViev, ManagePostDetailViev, ManageComments, ManageComment, ManageLikes

urlpatterns = [
    path('', ManagePostsViev.as_view()),
    path('<int:pk>', ManagePostDetailViev.as_view()),
    path('comments/<int:post_id>', ManageComments.as_view()),
    path('comment/<int:comment_id>', ManageComment.as_view()),
    path('like/<int:post_id>', ManageLikes.as_view())
]
