from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^list/', views.list),
    url(r'^(?P<product_type>\w{0,50})/$', views.product_view),
    url(r'^search.html/', views.search_product),
    url(r'^formulario.html/', views.formulario_view),
    url(r'^your-order.html/', views.your_order_view)
]
