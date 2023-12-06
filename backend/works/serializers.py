from rest_framework import serializers
from .models import Post
from django.contrib.auth import get_user_model

User=get_user_model()

class PostSerializer(serializers.ModelSerializer):
    author=serializers.StringRelatedField(read_only=True)

    class Meta:
        model=Post
        fields=["id","title","content","date_created","author"]

    # def create(self, validated_data):
    #     validated_data["author"]=User.objects.get(username=validated_data["author_username"])
    #     validated_data.pop("author_username")
    #     return Post.objects.create(**validated_data)



