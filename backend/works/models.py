from django.db import models
from django.contrib.auth import get_user_model

class Post(models.Model):
    title=models.CharField(max_length=1000,null=False)
    content=models.TextField()
    date_created=models.DateField(auto_now_add=True)
    author=models.ForeignKey(to=get_user_model(),on_delete=models.CASCADE)
    def __str__(self):
        return self.title
