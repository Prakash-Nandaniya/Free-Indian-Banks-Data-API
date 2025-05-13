from django.db import models

class SubscriberInfo(models.Model):
    email = models.EmailField(primary_key=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.email



class SubscriberKey(models.Model):
    email = models.OneToOneField(
        SubscriberInfo,
        on_delete=models.CASCADE,
        to_field='email',
        db_column='email',
        primary_key=True
    )
    apikey = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"{self.email.email} - {self.apikey}"
