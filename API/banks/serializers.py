from rest_framework import serializers
from .models import Bank, Branch

class BankSerializer(serializers.ModelSerializer):
    bank_code = serializers.SerializerMethodField()

    class Meta:
        model = Bank
        fields = ['id', 'name', 'bank_code']

    def get_bank_code(self, obj):
        branch = Branch.objects.filter(bank=obj).first()
        if branch and branch.ifsc:
            return branch.ifsc[:4]
        return None

class BranchListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ['branch', 'ifsc']

class BranchDetailSerializer(serializers.ModelSerializer):
    bank = serializers.CharField(source='bank.name')  # This will output the bank name

    class Meta:
        model = Branch
        fields = ['ifsc', 'bank', 'branch', 'address', 'city', 'district', 'state']