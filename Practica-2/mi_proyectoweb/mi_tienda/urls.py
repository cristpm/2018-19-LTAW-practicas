from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home_view),
    url(r'^list/', views.list),
    url(r'^televisores/', views.televisores_view),
    url(r'^moviles/', views.moviles_view),
    url(r'^ordenadores/', views.ordenadores_view)
]
