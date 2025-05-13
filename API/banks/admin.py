from django.contrib import admin
from .models import Bank, Branch  # For banks app

admin.site.register(Bank)
admin.site.register(Branch)
