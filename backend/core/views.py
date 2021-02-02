from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework.request import Request

class UserRequestViewSet(APIView):
    def get(self, request):
        serializer_context = {
            'request': request,
        }
        serializer = UserSerializer(request.user, context=serializer_context)
        return Response(data=serializer.data)