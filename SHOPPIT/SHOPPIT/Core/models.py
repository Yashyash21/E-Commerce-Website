from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class Customuser(AbstractUser):
    city=models.CharField(max_length=100,blank=True,null=True)
    state=models.CharField(max_length=100,blank=True,null=True)
    address=models.TextField(blank=True,null=True)
    phone=models.CharField(blank=True,null=True)

def __str__(self):
    return self.username



