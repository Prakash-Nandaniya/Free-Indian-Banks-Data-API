from django.http import JsonResponse
from subscribers.models import SubscriberKey

class ApiKeyMiddleware:
    """
    Middleware to check for a valid API key in the query parameters for protected endpoints.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Only check API key for /api/banks/ and /api/branches/ endpoints
        path = request.path
        if path.startswith('/api/banks') or path.startswith('/api/branches'):
            apikey = request.GET.get('apikey')
            if not apikey:
                return JsonResponse({'error': 'API key is required in query parameters.'}, status=401)
            if not SubscriberKey.objects.filter(apikey=apikey).exists():
                return JsonResponse({'error': 'Invalid API key.'}, status=401)
        return self.get_response(request)
