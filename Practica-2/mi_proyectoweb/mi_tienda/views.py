# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from mi_tienda.models import Product
# Create your views here.
def home_view (request):
    return render(request, "index-tienda.html", {})

def list(request):
    objects = Product.objects.all()
    html = "<p>Listado de articulos</p>"
    for elt in objects:
        print(elt.name)
        html += '<p>'+ elt.name + ' ' + str(elt.price) + '<p>'
    return HttpResponse(html)

def televisores_view (request):
    return render(request, "index-tienda.html", {})

def moviles_view (request):
    return render(request, "index-tienda.html", {})

def ordenadores_view (request):
    return render(request, "index-tienda.html", {})
