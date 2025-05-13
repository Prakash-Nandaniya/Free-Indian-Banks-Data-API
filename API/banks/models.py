from django.db import models

class Bank(models.Model):
    id = models.BigIntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        db_table = 'banks'
        managed = False  # Set to False if you don't want Django to manage the table

    def __str__(self):
        return self.name

class Branch(models.Model):
    ifsc = models.CharField(max_length=11, primary_key=True)
    bank = models.ForeignKey(Bank, db_column='bank_id', on_delete=models.DO_NOTHING)
    branch = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255)
    district = models.CharField(max_length=255)
    state = models.CharField(max_length=255)

    class Meta:
        db_table = 'branches'
        managed = False # Set to False if you don't want Django to manage the table

    def __str__(self):
        return f"{self.branch} ({self.ifsc})"
