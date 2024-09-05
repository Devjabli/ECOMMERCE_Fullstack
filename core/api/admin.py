from django.contrib import admin
from api.models import Product, OrderItem, Order, ShippingAddress, Review, Report

admin.site.register(Product)
admin.site.register(OrderItem)
admin.site.register(Order)
admin.site.register(ShippingAddress)
admin.site.register(Review)
admin.site.register(Report)
