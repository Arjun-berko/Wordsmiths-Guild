from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model

class PostSerializer(serializers.ModelSerializer):
    author=serializers.StringRelatedField()
    author_username=serializers.CharField(write_only=True)

    class Meta:
        model=Post
        fields=["id","title","content","date_created","author","author_username"]

    def create(self, validated_data):
        validated_data["author"]=get_user_model().objects.get(username=validated_data["author_username"])
        validated_data.pop("author_username")
        return Post.objects.create(**validated_data)



