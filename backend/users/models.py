from django.db import models
from django.contrib.auth.models import AbstractUser
from django.dispatch import Signal,receiver
from django.db.models.signals import post_save



class AppUser(AbstractUser):
    email = models.EmailField(unique=True, null=False)

    # Additional fields and methods can be added here if needed


class UserProfile(models.Model):
    name=models.CharField(max_length=500)
    image=models.ImageField()
    profile_intro=models.TextField()
    owner=models.OneToOneField(User,on_delete=models.CASCADE)




@receiver(post_save,sender=AppUser)
def user_profile_receiver(sender,instance,created,**kwargs):
    if created:
        UserProfile.objects.create(owner=instance)