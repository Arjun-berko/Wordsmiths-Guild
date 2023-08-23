from django.shortcuts import render
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Post
from .serializers import PostSerializer
from rest_framework import authentication, permissions
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404


User=get_user_model()

class PostRetrieveAPIView(generics.RetrieveAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostListAPIView(generics.ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostCreateAPIView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticated]

class PostDestroyAPIView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "pk"
    permission_classes = [permissions.IsAuthenticated]

class PostUpdateAPIView(generics.UpdateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = "pk"
    permission_classes = [permissions.IsAuthenticated]

class UserPostListAPIView(generics.ListAPIView):
    serializer_class = PostSerializer
    def get_queryset(self):
        username=self.kwargs.get("username")
        user_instance=get_object_or_404(User,username=username)
        return Post.objects.filter(author=user_instance)







