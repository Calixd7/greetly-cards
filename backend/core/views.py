from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.request import Request
from rest_framework.viewsets import ModelViewSet
from core.models import Card
from .serializers import CardSerializer, UserSerializer
from django.core.exceptions import PermissionDenied
from rest_framework import permissions
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import action

class IsAuthorOrReadOnly(permissions.BasePermission):
     
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        if request.user.is_authenticated:
            return True

        return False

        def has_object_permission(self, request, view, obj):
            if request.method in permissions.SAFE_METHODS:
                return True

            return obj.author == request.user



class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    
    def get_queryset(self):
        return User.objects.all()

    def perform_create(self, serializer):
        return serializer.save(self.request.user)


class CardViewSet(ModelViewSet):

    serializer_class = CardSerializer
    permission_classes = [IsAuthorOrReadOnly, permissions.IsAuthenticated]
    queryset = Card.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    
    def get_queryset(self):
        return Card.objects.filter(author=self.request.user)

    @action(detail=False, methods=['get'])
    def all(self, request):
        cards = Card.objects.all().order_by('created_at')
        page = self.paginate_queryset(cards)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = CardSerializer(cards, many=True, context={'request': request})
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def me (self, request):
        queryset = Card.objects.filter(author=request.user).order_by('created_at')

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

        





    