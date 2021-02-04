from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.request import Request
from rest_framework.viewsets import ModelViewSet
from core.models import Card
from .serializers import CardSerializer, UserSerializer

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    
    def get_queryset(self):
        return User.objects.all()

    def perform_create(self, serializer):
        return serializer.save(self.request.user)


class CardViewSet(ModelViewSet):
    
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
