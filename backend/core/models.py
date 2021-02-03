from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    pass

# class Followers(models.Model):


class card(models.Model):
    author = models.ForeignKey(to=User,on_delete=models.CASCADE,related_name="cards" )
    message = models.TextField()
    public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    genre = models.CharField(max_length=255)



