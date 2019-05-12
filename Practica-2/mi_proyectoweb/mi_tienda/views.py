# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
from mi_tienda.models import Producto


# Create your views here.
def home_view (request):
    return render(request, "index-tienda.html", {})


def search_product (request):
        query = request.GET.get('search_input', None)
        objects = Producto.objects.filter(name__icontains=query)
        html = "<p>Listado de articulos encontrados</p>"
        for elt in objects:
            print(elt.name)
            html += '<p>'+ ' ' + elt.name  + '<p>'
        return HttpResponse(html)


def formulario_view(request):
    return render(request, "formulario.html", {})


def your_order_view(request):
    html = "<p>Su compra se ha procesado con exito</p>"
    return HttpResponse(html)


def product_view(request, product_type):
    objects = Producto.objects.filter(tipo = product_type)
    return render(request, "productos.html", {
    'image1': objects[0].name + ".png",
    'p1name' : objects[0].name,
    'p1price': str(objects[0].price) + " $",
    'p1stock': objects[0].stock,
    'image2': objects[1].name + ".png",
    'p2name' : objects[1].name,
    'p2price': str(objects[1].price) + " $",
    'p2stock': objects[0].stock,
    'image3': objects[2].name + ".png",
    'p3name' : objects[2].name,
    'p3price': str(objects[2].price) + "$",
    'p3stock': objects[0].stock,
    })

def list(request):
    objects = Producto.objects.all()
    html = "<p>Listado de articulos</p>"
    for elt in objects:
        print(elt.name)
        html += '<p>'+ elt.tipo + ' ' + elt.name + ' ' + str(elt.price) + '<p>'
    return HttpResponse(html)
