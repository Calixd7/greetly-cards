from rest_framework import serializers
from .models import User, Card
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'name', "followed_users"]

class CardSerializer(serializers.HyperlinkedModelSerializer):
    author = UserSerializer(read_only=True)
    class Meta:
        model = Card
        fields = ['url', 'author', "title", 'genre', 'message', 'created_at']