from django.shortcuts import render
from rest_framework import generics
from .models import UserProfile
from .serializers import UserProfileSerializer,UserSerializer
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import permissions,authentication
from .permissions import IsProfileOwner

User=get_user_model()



class UserCreateAPIView(generics.CreateAPIView):
    queryset = User
    serializer_class = UserSerializer


class UserProfileDetailAPIView(generics.RetrieveAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    def get_object(self):
        my_user=get_object_or_404(User,username=self.kwargs.get("username"))
        return UserProfile.objects.get(owner=my_user)

class UserProfileUpdateAPIView(generics.UpdateAPIView):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    # authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated,IsProfileOwner]
    # def get_object(self):
    #     my_user=get_object_or_404(User,username=self.kwargs.get("username"))
    #     return UserProfile.objects.get(owner=my_user)
    def get_object(self):
        my_user=get_object_or_404(User,username=self.kwargs.get("username"))
        return UserProfile.objects.get(owner=my_user)