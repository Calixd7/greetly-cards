from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models import UniqueConstraint


class User(AbstractUser):
    name= models.CharField(max_length=255)
    
     

class Card(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name="cards" )
    message = models.TextField(blank=True, null=True)
    size = models.CharField(max_length=100,  default="", null =True)
    color = models.CharField(max_length=100,  blank=True, null=True)
    style = models.CharField(max_length=100, default="", null=True)
    font = models.CharField(max_length=100, default="", null=True)
    weight = models.CharField(max_length=100, default="", null=True)
    alignment = models.CharField (max_length=100, default="", null=True)
    textboxalignment = models.CharField(max_length=100, default="", null=True)
    image = models.ImageField( blank=True, null=True)
    Access = models.BooleanField(default=True)
    genre = models.CharField(max_length=255, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)





class UserFollowing(models.Model):
    user = models.ForeignKey(User, related_name="following", on_delete=models.CASCADE)
    following_user= models.ForeignKey(User, related_name="followers", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['user','following_user'],  name="unique_followers")
        ]

        ordering = ["-created"]

    def __str__(self):
        f"{self.user} follows {self.following_user}"



 