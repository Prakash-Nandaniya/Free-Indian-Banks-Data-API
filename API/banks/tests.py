from django.urls import reverse
from rest_framework.test import APITestCase
from subscribers.models import SubscriberInfo, SubscriberKey
from banks.models import Bank, Branch

class BankBranchAPITests(APITestCase):
    def setUp(self):
        # Create test subscriber and API key
        self.subscriber = SubscriberInfo.objects.create(
            email="user@example.com",
            first_name="Test",
            last_name="User",
            country="India"
        )
        self.api_key = SubscriberKey.objects.create(
            email=self.subscriber,
            apikey="testapikey123"
        ).apikey

        # Create test bank
        self.bank = Bank.objects.create(id=1, name="Test Bank")

        # Create test branch
        self.branch = Branch.objects.create(
            ifsc="TEST0001ABC",
            bank=self.bank,
            branch="Main Branch",
            address="123 Main St",
            city="Metropolis",
            district="Central",
            state="Test State"
        )

    def test_banks_list_no_apikey(self):
        """Test banks list endpoint with no API key"""
        url = reverse('bank-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()['error'], 'API key is required in query parameters.')

    def test_banks_list_wrong_apikey(self):
        """Test banks list endpoint with wrong API key"""
        url = reverse('bank-list') + "?apikey=wrongkey"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()['error'], 'Invalid API key.')

    def test_banks_list_success(self):
        """Test banks list endpoint with correct API key"""
        url = reverse('bank-list') + f"?apikey={self.api_key}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['name'], "Test Bank")

    def test_branches_by_bank_code(self):
        """Test branches list by bank code"""
        url = reverse('branches-by-bank-code', args=['TEST']) + f"?apikey={self.api_key}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 1)
        self.assertEqual(response.json()[0]['ifsc'], "TEST0001ABC")

    def test_branch_detail_success(self):
        """Test branch detail endpoint with correct IFSC and API key"""
        url = reverse('branch-detail', args=['TEST0001ABC']) + f"?apikey={self.api_key}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['branch'], "Main Branch")
        self.assertEqual(response.json()['bank'], "Test Bank")

    def test_branch_detail_not_found(self):
        """Test branch detail endpoint with non-existent IFSC"""
        url = reverse('branch-detail', args=['INVALIDIFSC']) + f"?apikey={self.api_key}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, 404)
