from django.db import models
from django.contrib.auth.models import User


# Cette classe définie le modèle 'Post' 
# Un modèle dans Django est essentiellement une représentation de la table de la base de données
class Post(models.Model):
    title = models.CharField(max_length=200)  # Titre du post
    text = models.TextField()  # Texte du post
    likes = models.IntegerField()  # Nombre de likes du post
    authorName = models.CharField(max_length=200)  # Nom de l'auteur du post
    publishedDate = models.DateTimeField()  # Date de publication du post
    imageUrl = models.URLField()  # URL de l'image du post
    comments = models.IntegerField()  # Nombre de commentaires du post
    shares = models.IntegerField()  # Nombre de partages du post
    postUrl = models.URLField()  # URL du post
