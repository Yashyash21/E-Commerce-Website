from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Product, Cart,CartItem
from .serializers import productserializers ,DetailedproductSerializer,CartItemSerializer,SimpleCartSerializer,CartSerializer
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
@api_view(["GET"])
def products(request):
    Products=Product.objects.all()
    serializers=productserializers(Products,many=True)
    return Response(serializers.data)

@api_view(["GET"])
def product_detail(request,slug):
    product=Product.objects.get(slug=slug)
    serializer=DetailedproductSerializer(product)
    return Response(serializer.data)


@api_view(["POST"])
def add_item(request):
    try:
        cart_code = request.data.get("cart_code")
        product_id = request.data.get("product_id")

        cart, created =Cart.objects.get_or_create(cart_code = cart_code)
        product = Product.objects.get(id=product_id)

        cartitem, created  = CartItem.objects.get_or_create(cart=cart, product=product)
        cartitem.quantity = 1 
        cartitem.save()

        serializer = CartItemSerializer(cartitem)
        return Response({"datat": serializer.data, "message": "Cartitem created successfully"}, status=201)
    except Exception as e:
        return Response({"error": str(e)}, status=400)

@api_view(['GET'])
def product_in_cart(request):
    cart_code = request.query_params.get("cart_code")
    product_id = request.query_params.get("product_id")
    
    cart = Cart.objects.get(cart_code=cart_code)
    product = Product.objects.get(id=product_id)
    
    product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()

    return Response({'product_in_cart': product_exists_in_cart})

@api_view(['GET'])
def get_cart_stat(request):
    cart_code = request.query_params.get("cart_code")
    cart = Cart.objects.get(cart_code=cart_code, paid=False)
    serializer = SimpleCartSerializer(cart)
    return Response(serializer.data)

from rest_framework import status

@api_view(['GET'])
def get_cart(request):
    cart_code = request.query_params.get("cart_code")
    if not cart_code:
        return Response({"error": "Cart code is required"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        cart = Cart.objects.get(cart_code=cart_code, paid=False)
        serializer = CartSerializer(cart)
        return Response(serializer.data)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PATCH'])
def update_quantity(request):
    try:
        cartitem_id = request.data.get("item_id")
        quantity = int(request.data.get("quantity", 0))

        cartitem = CartItem.objects.get(id=cartitem_id)
        cartitem.quantity = quantity
        cartitem.save()

        serializer = CartItemSerializer(cartitem)
        return Response({"data": serializer.data, "message": "Cartitem updated successfully!"}, status=200)

    except CartItem.DoesNotExist:
        return Response({'error': 'CartItem not found.'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=400)


@api_view(['POST'])
def delete_cartitem(request):
    cartitem_id = request.data.get("item_id")
    cartitem = CartItem.objects.get(id=cartitem_id)
    cartitem.delete()
    return Response({"mesaage": "Item deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
