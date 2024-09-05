from django.urls import path
from api.views import order_views as views


urlpatterns = [
    path('', views.getOrders),
    path('list/', views.getOrdersDash),
    path('add/', views.addOrderItems),
    path('dash/', views.ChartModel.as_view()),
    path('myorders/', views.getMyOrders),
    path('<str:pk>/delete/', views.deleteOrder),
    path('<str:pk>/', views.getOrderById),
    path('<int:pk>/pay/', views.updateOrderToPaid),
    path('<int:pk>/deliver/', views.updateOrderToDeliver),
    path('<int:pk>/deliver/cancel/', views.updateOrderToDeliverCancel)
]
