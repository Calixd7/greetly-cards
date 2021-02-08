from rest_framework import serializers
from .models import User, Card, UserFollowing
  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name' ]

    

class CardSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer(read_only=True)
    image = serializers.ImageField(max_length=None, use_url=True)
    class Meta:
        model = Card
        fields = ['url', "pk", 'author', 'genre', "Access",'message', 'created_at', "size", "color", "style", "font", "weight", "alignment", "textboxalignment","image"]


class UserFollowingSerializer (serializers.ModelSerializer):
    
    class Meta:
        model = UserFollowing 
        fields = ['user', "following_user"]
        read_only_fields = ['user']

    
