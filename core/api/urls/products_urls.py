from django.urls import path
from api.views import product_views

urlpatterns = [
    path('list/', product_views.getProducts),
    path('', product_views.ProductListView.as_view()),
    path('<int:pk>/', product_views.ProductDetailView.as_view()),
    path('reports/', product_views.getAllReports),
]

