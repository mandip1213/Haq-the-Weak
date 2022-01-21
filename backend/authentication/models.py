import uuid

from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone

from .managers import UserManager



class User(AbstractBaseUser,PermissionsMixin):
    id = models.UUIDField(editable=False,unique=True,default=uuid.uuid4,primary_key=True)
    uuid = models.UUIDField(editable=False,unique=True,default=uuid.uuid4)
    name = models.CharField(max_length=128)
    username = models.CharField(max_length=128)
    bio = models.CharField(max_length=256,null=True,blank=True,default='')
    homewtown = models.CharField(max_length=256,null=True,blank=True,default='')
    profile_picture = models.ImageField(blank=True,null=True,upload_to ='user/profile/')
    email = models.EmailField('Email Address',unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    following = models.ManyToManyField('self',related_name='followers',blank=True,symmetrical=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS =['name']
    objects = UserManager()

    def __str__(self):
        return self.name + '-' + self.email