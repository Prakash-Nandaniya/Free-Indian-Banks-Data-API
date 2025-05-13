from rest_framework import serializers
from .models import SubscriberInfo, SubscriberKey

class SubscriberInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriberInfo
        fields = ['email', 'first_name', 'last_name', 'country']

class SubscriberKeySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriberKey
        fields = ['email', 'apikey']
