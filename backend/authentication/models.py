from tabnanny import verbose
import uuid
from utils.data import Districts
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone
from utils.utils import add_geofence
from .managers import UserManager

class Batches(models.Model):
    batch_name = models.CharField(max_length = 50)
    batch_photo = models.ImageField(blank=True,null=True,upload_to = 'batches/')

    def __str__(self):
        return self.batch_name
    
    class Meta:
        verbose_name = 'Batch'
        verbose_name_plural = "Batches"


class User(AbstractBaseUser,PermissionsMixin):
    genders=[
        ('Male','Male'),
        ('Female','Female'),

    ]
    id = models.UUIDField(editable=False,unique=True,default=uuid.uuid4,primary_key=True)
    uuid = models.UUIDField(editable=False,unique=True,default=uuid.uuid4)
    first_name = models.CharField(max_length=128,blank=True,null=True)
    last_name = models.CharField(max_length=128,blank=True,null=True)
    username = models.CharField(max_length=128)
    bio = models.CharField(max_length=256,null=True,blank=True)
    home_town = models.CharField(max_length=256,null=True,blank=True,choices=Districts)
    home_latitude = models.DecimalField(max_digits=11,decimal_places=8,null=True,blank=True)
    home_longitude = models.DecimalField(max_digits=11,decimal_places=8,null=True,blank=True)
    latest_latitude = models.DecimalField(max_digits=11,decimal_places=8,null=True,blank=True)
    latest_longitude = models.DecimalField(max_digits=11,decimal_places=8,null=True,blank=True)
    profile_picture = models.ImageField(blank=True,null=True,upload_to ='user/profile/')
    email = models.EmailField('Email Address',unique=True)
    batch = models.ManyToManyField(Batches,blank=True)
    gender = models.CharField(max_length=20,choices=genders,null=True,blank=True)
    date_of_birth = models.DateField(null=True,blank=True)

    is_vendor = models.BooleanField(default=False)

    # wishlist
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    following = models.ManyToManyField('self',related_name='followers',blank=True,symmetrical=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =['username']
    objects = UserManager()

    def __str__(self):
        return str(self.first_name) + '-' + self.email

    

class Vendor(models.Model):
    id = models.UUIDField(editable=False,unique=True,default=uuid.uuid4,primary_key=True)
    vendor = models.OneToOneField(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=150)
    location = models.CharField(max_length=150,choices=Districts)
    latitude = models.DecimalField(max_digits=11,decimal_places=8)
    longitude = models.DecimalField(max_digits=11,decimal_places=8)
    importance_point = models.IntegerField(null=True)
    contact = models.CharField(max_length=50,blank=True,null=True)
    image = models.ImageField(blank=True,null=True,upload_to='places/')
    type_of_place = models.CharField(max_length=100)
    is_public = models.BooleanField(default=False)
    is_sponsor = models.BooleanField(default=False)


    def __str__(self):
        return self.name + ' - ' + self.location
    

    def save(self,*args,**kwargs):
        add_geofence(self.name,self.type_of_place,self.id,self.latitude,self.longitude)
        super().save(*args,**kwargs)


