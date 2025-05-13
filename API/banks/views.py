from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Bank, Branch
from .serializers import BankSerializer, BranchListSerializer, BranchDetailSerializer
from rest_framework import status, throttling

class CountPagination(PageNumberPagination):
    page_size = None  

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'results': data
        })


class BurstRateThrottle(throttling.UserRateThrottle):
    rate = '100/min'

class BankListView(ListAPIView):
    queryset = Bank.objects.all().order_by('id')
    serializer_class = BankSerializer
    pagination_class = CountPagination
    throttle_classes = [BurstRateThrottle]

class BranchesByBankCodeView(ListAPIView):
    serializer_class = BranchListSerializer
    pagination_class = CountPagination
    throttle_classes = [BurstRateThrottle]
    def get_queryset(self):
        bank_code = self.kwargs['bank_code'].upper()
        return Branch.objects.filter(ifsc__startswith=bank_code).order_by('branch')

class BranchDetailView(RetrieveAPIView):
    queryset = Branch.objects.all()
    serializer_class = BranchDetailSerializer
    lookup_field = 'ifsc'
    throttle_classes = [BurstRateThrottle]
