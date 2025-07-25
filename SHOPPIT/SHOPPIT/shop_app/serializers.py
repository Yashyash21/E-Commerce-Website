from rest_framework import serializers 
from .models import Product ,Cart,CartItem


class productserializers(serializers.ModelSerializer):
    class Meta :
        model=Product
        fields=["id","name","slug","image","description","category","price"]
        # name denote kele models mdle

class DetailedproductSerializer(serializers.ModelSerializer):
    similar_Products=serializers.SerializerMethodField()
    class Meta:
        model=Product
        fields=["id","name","slug","image","description","category","price","similar_Products"]

    def get_similar_Products(self,obj):
        products=Product.objects.filter(category=obj.category).exclude(id=obj.id)
        serializer=productserializers(products,many=True)
        # Converts many products into a format that your frontend (or app) can understand and display.
        return serializer.data
               




class CartItemSerializer(serializers.ModelSerializer):
    product = productserializers(read_only=True)
    total = serializers.SerializerMethodField()
    class Meta:
        model = CartItem 
        fields = ["id", "quantity", "product", "total"]


    def get_total(self, cartitem):
        price = cartitem.product.price * cartitem.quantity
        return price
   
    

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(read_only=True, many=True)
    sum_total = serializers.SerializerMethodField()
    num_of_items = serializers.SerializerMethodField()
    num_of_product = serializers.SerializerMethodField()
    class Meta:
        model = Cart 
        fields = ["id", "cart_code", "items", "sum_total", "num_of_product", "num_of_items", "created_at", "modified_at"]

    def get_sum_total(self, cart):
        items = cart.items.all()
        total = sum([item.product.price * item.quantity for item in items])
        return total

    def get_num_of_items(self, cart):
        items = cart.items.all()
        total = sum([item.quantity for item in items])
        return total
    
    def get_num_of_product(self, cart):
      return cart.items.count()


class SimpleCartSerializer(serializers.ModelSerializer):
    num_of_items = serializers.SerializerMethodField()
    class Meta:
        model = Cart 
        fields = ["id", "cart_code", "num_of_items"]

    def get_num_of_items(self, cart):
        num_of_items = sum([item.quantity for item in cart.items.all()])
        return num_of_items
  
      