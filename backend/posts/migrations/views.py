from django.http import JsonResponse
from .models import Post

from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse

# Cette fonction est une vue qui va gérer la récupération des posts 
def get_posts(request):
    # Récupère les paramètres de filtrage de la requête
    search_text = request.GET.get('search_text', '')

    # Utilise ces paramètres pour filtrer les posts
    # Ici, on filtre les posts en fonction du texte de recherche en cherchant ce texte dans les titres et les contenus des posts
    posts = Post.objects.filter(title__icontains=search_text) | Post.objects.filter(text__icontains=search_text)

    # Renvoie les posts filtrés en JSON
    # On utilise la fonction 'values' pour convertir les objets posts en dictionnaires
    # puis on utilise JsonResponse pour convertir ces dictionnaires en JSON
    return JsonResponse(list(posts.values()), safe=False)


def login_view(request):
    # Suppose que 'username' et 'password' sont envoyés dans le corps de la requête POST
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponse("Vous êtes connecté.")
    else:
        return HttpResponse("Echec de l'authentification.")

def logout_view(request):
    logout(request)
    return HttpResponse("Vous êtes déconnecté.")