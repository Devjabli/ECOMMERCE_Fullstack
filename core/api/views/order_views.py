from rest_framework import status
from django.utils import timezone
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

# REST FRAMEWORK IMPORT
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response


from django.db.models.functions import TruncMonth
from django.db.models import Sum

# LOCAL IMPORT 
from api.models import *
from api.serializers import OrderSerializer



# DASHBOAD 
@api_view(['GET'])
def getOrdersDash(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

class ChartModel(APIView):

    def get(self, request, format=None):

        total_price_by_month = (
            Order.objects.annotate(month=TruncMonth('createdAt'))
            .values('month')
            .annotate(total_price=Sum('totalPrice'))
            .values('month', 'total_price')
            .order_by('month')
        )
        return Response(total_price_by_month)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addOrderItems(request):
    
    data = request.data
    user = request.user

    orderItems = data['orderItems']

    if orderItems and len(orderItems) == 0:
        return Response({'detail': 'No Order Items', 'status': status.HTTP_400_BAD_REQUEST})
    else:
        order = Order.objects.create(
            user=user,
            paymentMethod=data['paymentMethod'],
            taxtPrice=data['taxPrice'],
            shippingPrice=data['shippingPrice'],
            totalPrice=data['totalPrice']
        ) 


        shipping = ShippingAddress.objects.create(
            order=order,
            firstName=data['shippingAddress']['firstName'],
            lastName=data['shippingAddress']['lastName'],
            appartment=data['shippingAddress']['appartment'],
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            country=data['shippingAddress']['country'],
            cellPhone=data['shippingAddress']['cellPhone'],
            postalCode= data['shippingAddress']['postalCode']

        )

        for i in orderItems:
            
            product = Product.objects.get(_id=i['id'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=i['qty'],
                price=i['price'],
                image=product.image.url
            )


        product.countInStock -= item.qty
        product.save()    
    
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)   


@api_view(['GET'])
@permission_classes([AllowAny])
def getOrders(request):
    query = request.query_params.get('keyword')
    if query == None:
        query = ''

    orders = Order.objects.filter(_id__contains=query).order_by('-createdAt')


    page = request.query_params.get('page')
    paginator = Paginator(orders, 7)

    try:
        orders = paginator.page(page)
    except PageNotAnInteger:
        orders = paginator.page(1)
    except EmptyPage:
        orders = paginator.page(paginator.num_pages)

    serializer = OrderSerializer(orders, many=True)
    return Response({'orders': serializer.data, 'page': page, 'pages': paginator.num_pages})

@api_view(['DELETE'])
def deleteOrder(request, pk):
    order = Order.objects.get(_id=pk)
    order.delete()
    return Response('Order Deleted Successfully')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

"""
@api_view(['GET'])    
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not Authorized'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)         

"""

@api_view(['GET'])
@permission_classes([AllowAny])
def getOrderById(request, pk):
    order = Order.objects.get(_id=pk)
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)



@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateOrderToPaid(request, pk):
    order = Order.objects.get(_id=pk) 
    order.isPaid = True
    order.paidAt = timezone.now()   
    order.save()
    return Response('Order Paid Successfully')  


@api_view(['PUT'])    
@permission_classes([AllowAny])
def updateOrderToDeliver(request, pk):
    order = Order.objects.get(_id=pk)
    order.isDelivered = True
    order.deliveredAt = timezone.now()
    order.save()
    return Response('Order Delivered successfully')


@api_view(['PUT'])    
@permission_classes([AllowAny])
def updateOrderToDeliverCancel(request, pk):
    order = Order.objects.get(_id=pk)
    order.isDelivered = False
    order.save()
    return Response('Order Delivered successfully')

