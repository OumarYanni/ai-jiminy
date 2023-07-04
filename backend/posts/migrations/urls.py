from django.urls import path

from . import views

urlpatterns = [
    path('posts/', views.get_posts),  # Associe l'URL '/posts/' à la vue 'get_posts'
]
