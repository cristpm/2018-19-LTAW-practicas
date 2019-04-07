# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from mi_tienda.models import Product

# Create your views here.
def home_view (request):
    return render(request, "index-tienda.html", {})

def televisores_view (request):
    return render(request, "productos.html", {
    'image1': 'tele.png',
    'p1name' : 'SAMSUNG tv 42"',
    'p1price': '599$',
    'image2': 'tele.png',
    'p2name' : 'SAMSUNG tv 32"',
    'p2price': '499$',
    'image3': 'tele.png',
    'p3name' : 'SAMSUNG tv 28"',
    'p3price': '399$',
    })

def moviles_view (request):
    return render(request, "productos.html", {
    'image1': 'movil.png',
    'p1name' : 'SAMSUNG S10',
    'p1price': '799$',
    'image2': 'movil.png',
    'p2name' : 'SAMSUNG S9',
    'p2price': '599$',
    'image3': 'movil.png',
    'p3name' : 'SAMSUNG S8',
    'p3price': '499$',
    })

def ordenadores_view (request):
    return render(request, "productos.html", {
    'image1': 'msi-ps42.png',
    'p1name' : 'msi-ps42',
    'p1price': '999$',
    'image2': 'msi-ps42.png',
    'p2name' : 'msi-ps42',
    'p2price': '999$',
    'image3': 'msi-ps42.png',
    'p3name' : 'msi-ps42',
    'p3price': '999$',
    })

def list(request):
    objects = Product.objects.all()
    html = "<p>Listado de articulos</p>"
    for elt in objects:
        print(elt.name)
        html += '<p>'+ elt.name + ' ' + str(elt.price) + '<p>'
    return HttpResponse(html)
