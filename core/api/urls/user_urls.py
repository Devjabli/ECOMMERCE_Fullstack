
from django.urls import path
from api.views import user_views


urlpatterns = [
    path('register/', user_views.registerUser),
    path('login/', user_views.MyTokenObtainPairView.as_view()),
    path('', user_views.getUsers)
]
