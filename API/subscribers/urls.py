from django.urls import path
from .views import SubscribeView, ApiKeySearchView

urlpatterns = [
    path('subscribe/', SubscribeView.as_view(), name='subscribe'),
    path('search-apikey/', ApiKeySearchView.as_view(), name='search-apikey'),
]
