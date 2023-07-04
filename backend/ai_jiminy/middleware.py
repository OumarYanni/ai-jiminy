from django.http import HttpResponse

class ExceptionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_exception(self, request, exception):
        # Faire quelque chose avec l'exception
        # par exemple, envoyer un e-mail à l'administrateur du site
        print(exception)
        return HttpResponse("Une erreur s'est produite.")
