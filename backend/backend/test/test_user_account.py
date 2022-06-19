from django.http import HttpResponseRedirect
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse


class PostsTest(APITestCase):
    def test_create_user(self):
        create_url = reverse("user-list")
        create_data = {
            "first_name": "John",
            "last_name": "Doe",
            "nickname": "test_user_john",
            "email": "temp2@gmail.com",
            "password": "test_password",
            "re_password": "test_password"
        }
        response = self.client.post(create_url, create_data, format="json")
        self.assertEqual(status.HTTP_201_CREATED, response.status_code)









