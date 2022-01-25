from tabnanny import verbose
from django.conf import settings
from django.db import models
from utils.data import Districts,distance
import math
import uuid

User = settings.AUTH_USER_MODEL
# Create your models here.

class Vendor(models.Model):
    id = models.UUIDField(editable=False,unique=True,default=uuid.uuid4,primary_key=True)
    name = models.CharField(max_length=150)
    location = models.CharField(max_length=150,choices=Districts)
    contact = models.CharField(max_length=50,blank=True,null=True)
    image = models.ImageField(blank=True,null=True,upload_to='places/')
    type_of_place = models.CharField(max_length=100)
    is_sponsor = models.BooleanField(default=False)

    def __str__(self):
        return self.name + ' - ' + self.location
    
    class Meta:
        verbose_name = "Vendor"
        verbose_name_plural = "Vendors"


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


    @property
    def get_location_score(self):
        MAX_EAST_DIST = 835.3
        MAX_WEST_DIST = 960.86
        base_point = 2.0
        x_dist = float(distance[self.user.home_town]['x_dist'])-float(distance[self.vendor.location]['x_dist'])
        y_dist = float(distance[self.user.home_town]['y_dist'])-float(distance[self.vendor.location]['y_dist'])
        dist = math.sqrt(x_dist*x_dist+y_dist*y_dist)
        return base_point + (dist/(MAX_EAST_DIST+MAX_WEST_DIST))*10.0


    def save(self,*args,**kwarg):
        self.location_score = self.get_location_score
        super(VisitedPlaces,self).save(*args, **kwarg)

    def __str__(self):
        return str(self.user)+' - '+str(self.vendor) 


# class Leaderboard(models.Model):
#   Create a Leaderboard Table which stores the user and total score

