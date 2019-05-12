from __future__ import unicode_literals

from django.db import models

# Create your models here.

class Producto (models.Model):
    tipo = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    stock = models.IntegerField()
    price = models.FloatField()

class Order (models.Model):
    product_name = models.CharField(max_length=200)
    quantity = models.IntegerField()
    price = models.FloatField()
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=200)
