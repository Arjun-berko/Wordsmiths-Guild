from rest_framework import serializers
from .models import AppUser, UserProfile


class UserSerializer(serializers.ModelSerializer):
    password=serializers.CharField(write_only=True)
    class Meta:
        model=AppUser
        fields=["username","email","password"]

    def create(self,validated_data):
        user=AppUser.objects.create_user(**validated_data)
        return user

class UserProfileSerializer(serializers.ModelSerializer):
    owner=serializers.StringRelatedField()

    class Meta:
        model=UserProfile
        fields=["name","profile_intro","owner","image"] # add image to fields soon