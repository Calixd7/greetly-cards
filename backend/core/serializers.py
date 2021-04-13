from rest_framework import serializers
from .models import User, Card, UserFollowing
from rest_framework import serializers

from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):

    following = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()
    

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "name",
            "username",
            "following",
        
        )
        
    def get_following(self, obj):
        return FollowingSerializer(obj.following.all(), many=True).data

    def get_followers(self, obj):
        return FollowersSerializer(obj.followers.all(), many=True).data

    

class CardSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer(read_only=True)
   
    class Meta:
        model = Card
        fields = ['url', "pk", 'author', 'genre', "access",'message', 'created_at', "size", "color", "style", "font", "weight", "alignment", "textboxalignment","image", "textbackgroundopacity", "backgroundopacity", "backgroundcolor","textbackgroundcolor"]

class FollowingSerializer(serializers.ModelSerializer):
    following_user_id = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    class Meta:
        model = UserFollowing
        fields = ("id", "following_user_id", "created")
class FollowersSerializer(serializers.ModelSerializer):
    user_id = serializers.SlugRelatedField(slug_field="username", queryset=User.objects.all())
    class Meta:
        model = UserFollowing
        fields = ("id", "user_id", "created")

class UserFollowingSerializer(serializers.ModelSerializer):
    user_id = UserSerializer(read_only=True)
    following_user_id = serializers.PrimaryKeyRelatedField(queryset=User.objects.all()) 
    class Meta:
         model = UserFollowing
         fields = ("user_id", "following_user_id")


    
