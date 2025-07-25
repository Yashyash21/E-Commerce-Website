from django.db import models
from django.utils.text import slugify
from django.conf import settings
# Create your models here.
Category=(("Electronics","ELECTRONICS"),
          ("Groceries","GROCERIES"),
          ("Clothing","CLOTHING"))
class Product(models.Model):
    name=models.CharField(max_length=100)
    slug=models.SlugField(blank=True,null=True)
    description=models.TextField(blank=True,null=True)
    image=models.ImageField(upload_to='img')
    price=models.DecimalField(max_digits=10,decimal_places=2)
    category=models.CharField(max_length=15,choices=Category,blank=True,null=True)


    def __str__(self):
        return self.name
    

    def save(self,*args,**kwargs):
        if not self.slug:
            self.slug=slugify(self.name)
            unique_slug=self.slug
            counter=1
            if Product.objects.filter(slug=unique_slug).exists():
                unique_slug=f'{"self.slug"}-{counter}'
                counter+=1
            self.slug=unique_slug
        super().save(*args,**kwargs)

# 👉 If the object doesn't already have a slug, create one.
# Converts the product name into a slug (e.g., "Red Shirt" → "red-shirt").
#  Stores the first slug in a variable to check for duplicates.
# 👉 Starts a counter to make the slug unique if needed.
# 👉 Checks if the same slug already exists in the database.
# 👉 Adds a number to the slug (like red-shirt-1) if it's already taken.
# 👉 Increases the counter by 1 in case it needs to try again.
# 👉 Sets the final, unique slug to the object.
# Calls the original save() method to save the object in the database.

# super() runs the original (parent) function.
# In Django, it makes sure the model is saved to the database.
# uper() is used to call the parent class's method.
# In Django, it's used to save data after adding custom logic.

class Cart(models.Model):
    cart_code=models.CharField(max_length=11,unique=True)
    # One user → Many carts and auth_user --Points to the Django User model (or custom user model)
    # If the user is deleted, the cart is deleted too
    user=models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.CASCADE,blank=True,null=True)
    paid=models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now=True,blank=True,null=True)
    modified_at=models.DateTimeField(auto_now=True,blank=True,null=True)


    def __str__(self):
        return self.cart_code


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)
    

    def __str__(self):
        return f"{self.quantity} x {self.product.name} in cart {self.cart.id}"