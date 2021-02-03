from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.request import Request
from rest_framework.viewsets import ModelViewSet
from core.models import Card
from .serializers import CardSerializer, UserSerializer


class UserRequestViewSet(APIView):
    def get(self, request):
        serializer_context = {
            'request': request,
        }
        serializer = UserSerializer(request.user, context=serializer_context)
        return Response(data=serializer.data)

class CardViewSet(ModelViewSet):
    
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    def perform_create(self, serializer):
        serializer.save()
