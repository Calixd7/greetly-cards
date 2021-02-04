from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name= models.CharField(max_length=255,)
    followed_users = models.ManyToManyField(to='self', symmetrical=False, blank=True, related_name='followers')
     

class Card(models.Model):
    author = models.ForeignKey(to=User,on_delete=models.CASCADE,related_name="cards" )
    title = models.CharField(max_length=255, default= " ")
    message = models.TextField()
    public = models.BooleanField(default=True)
    genre = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)




