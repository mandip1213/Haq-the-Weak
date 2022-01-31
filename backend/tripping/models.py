from django.conf import settings
from django.db import models
from utils.data import Districts,distance
from utils.utils import add_geofence
import uuid

User = settings.AUTH_USER_MODEL
# Create your models here.

class Vendor(models.Model):
    id = models.UUIDField(editable=False,unique=True,default=uuid.uuid4,primary_key=True)
    name = models.CharField(max_length=150)
    location = models.CharField(max_length=150,choices=Districts)
    latitide = models.DecimalField(max_digits=9,decimal_places=6,blank=True,null=True)
    longitude = models.DecimalField(max_digits=9,decimal_places=6,blank=True,null=True)
    importance_point = models.IntegerField(null=True,blank=True)
    contact = models.CharField(max_length=50,blank=True,null=True)
    image = models.ImageField(blank=True,null=True,upload_to='places/')
    type_of_place = models.CharField(max_length=100)
    is_sponsor = models.BooleanField(default=False)

    def __str__(self):
        return self.name + ' - ' + self.location
    
    class Meta:
        verbose_name = "Vendor"
        verbose_name_plural = "Vendors"

    def save(self,*args,**kwargs):
        add_geofence(self.name,self.type_of_place,self.id,self.latitide,self.longitude)
        super().save(*args,**kwargs)



class VisitedPlaces(models.Model):
    id = models.UUIDField(editable=False,unique=True,default=uuid.uuid4,primary_key=True)
    user = models.ForeignKey(User,related_name='Visits',on_delete=models.CASCADE,editable=False)
    vendor = models.ForeignKey(Vendor,blank=True,on_delete=models.CASCADE,editable=False)
    content = models.CharField(max_length=300,blank=True,null=True)
    created_at = models.DateTimeField(auto_now=True,editable=False)
    location_score = models.FloatField(editable=False,null=True)
    public = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Visited Place'
        verbose_name_plural ='Visited Places' 

    def __str__(self):
        return str(self.user)+' - '+str(self.vendor) 


# class Leaderboard(models.Model):
#   Create a Leaderboard Table which stores the user and total score

