from rest_framework import serializers
from .models import User, Card
  

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', "following", "followers"]

    

class CardSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Card
        fields = ['url', "pk", 'author', 'genre', "public",'message', 'created_at', "size", "color", "style", "font", "weight", "alignment", "textboxalignment","image"]



