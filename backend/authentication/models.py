from tabnanny import verbose
import uuid
from utils.data import Districts
from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone

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
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128,blank=True,null=True)
    username = models.CharField(max_length=128)
    bio = models.CharField(max_length=256,null=True,blank=True,default='')
    home_town = models.CharField(max_length=256,null=True,blank=True,choices=Districts)
    profile_picture = models.ImageField(blank=True,null=True,upload_to ='user/profile/')
    email = models.EmailField('Email Address',unique=True)
    batch = models.ManyToManyField(Batches,blank=True)
    gender = models.CharField(max_length=20,choices=genders,null=True,blank=True)
    date_of_birth = models.DateField(null=True,blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    following = models.ManyToManyField('self',related_name='followers',blank=True,symmetrical=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =['username','home_town']
    objects = UserManager()

    def __str__(self):
        return self.first_name + '-' + self.email
    
