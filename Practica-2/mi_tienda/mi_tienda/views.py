from django.http import HttpResponse
from django.template import Template,Context

def mi_funcion(request):
    html = "Prueba"

    return HttpResponse(html)

def mi_producto(request,param):
    numero = int(param)
    html = "Acceso al producto : %i" % numero
    return HttpResponse(html)


PLANTILLA ="""
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <p>Bienvenido a mi tienda,{{user}}</p>
  </body>
</html>
"""

def saludo(request):
    # --Procesar la plantilla
    t = Template(PLANTILLA)
    # -- Crear el contexto: Nombre de usuario real
    c = Context({'user':'Epic Saxo guy'})
    # -- Obtener la pagina html final
    html = t.render(c)
    return HttpResponse(html)
