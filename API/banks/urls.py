from django.urls import path
from .views import BankListView, BranchesByBankCodeView, BranchDetailView

urlpatterns = [
    path('banks/', BankListView.as_view(), name='bank-list'),
    path('branches/<str:bank_code>/', BranchesByBankCodeView.as_view(), name='branches-by-bank-code'),
    path('branch/<str:ifsc>/', BranchDetailView.as_view(), name='branch-detail'),
]
