from django.urls import reverse
from rest_framework.test import APITestCase

class SubscriberAPITests(APITestCase):
    def setUp(self):
        self.subscribe_url = reverse('subscribe')
        self.search_url = reverse('search-apikey')
        self.valid_payload = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john@example.com",
            "country": "India"
        }

    def test_subscribe_success(self):
        """Test successful subscription and API key creation"""
        response = self.client.post(self.subscribe_url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, 201)
        self.assertIn('apikey', response.data)

    def test_subscribe_duplicate_email(self):
        """Test duplicate email registration returns error"""
        self.client.post(self.subscribe_url, self.valid_payload, format='json')
        response = self.client.post(self.subscribe_url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data['error'], 'Email already registered')

    def test_search_apikey_success(self):
        """Test searching for an API key with a registered email"""
        # First, subscribe
        self.client.post(self.subscribe_url, self.valid_payload, format='json')
        response = self.client.post(self.search_url, {"email": "john@example.com"}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('apikey', response.data)

    def test_search_apikey_not_registered(self):
        """Test searching for an API key with an unregistered email"""
        response = self.client.post(self.search_url, {"email": "notfound@example.com"}, format='json')
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data['error'], 'No subscription with this email')

    def test_subscribe_missing_fields(self):
        """Test subscription with missing required fields"""
        response = self.client.post(self.subscribe_url, {"email": "no_name@example.com"}, format='json')
        self.assertEqual(response.status_code, 400)
        self.assertIn('first_name', response.data)
        self.assertIn('country', response.data)
