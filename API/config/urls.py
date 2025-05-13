from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('subscribers.urls')),  
    path('api/', include('banks.urls')),
]