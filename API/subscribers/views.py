import secrets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, throttling
from .models import SubscriberInfo, SubscriberKey
from .serializers import SubscriberInfoSerializer, SubscriberKeySerializer

class BurstRateThrottle(throttling.UserRateThrottle):
    rate = '100/min'

class SubscribeView(APIView):
    throttle_classes = [BurstRateThrottle]

    def post(self, request):
        email = request.data.get('email')
        if SubscriberInfo.objects.filter(email=email).exists():
            return Response({'error': 'Email already registered'}, status=status.HTTP_400_BAD_REQUEST)
        serializer = SubscriberInfoSerializer(data=request.data)
        if serializer.is_valid():
            subscriber = serializer.save()
            apikey = secrets.token_urlsafe(48)
            SubscriberKey.objects.create(email=subscriber, apikey=apikey)
            return Response({'apikey': apikey}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ApiKeySearchView(APIView):
    throttle_classes = [BurstRateThrottle]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)
        try:
            key = SubscriberKey.objects.get(email=email)
            return Response({'apikey': key.apikey})
        except SubscriberKey.DoesNotExist:
            return Response({'error': 'No subscription with this email'}, status=status.HTTP_404_NOT_FOUND)
