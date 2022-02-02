from django.conf import settings
from django.db import models
from django.core.validators import MaxValueValidator,MinValueValidator
import uuid
from authentication.models import Vendor
User = settings.AUTH_USER_MODEL
# Create your models here.


class VisitedPlaces(models.Model):
    id = models.UUIDField(editable=False,unique=True,default=uuid.uuid4,primary_key=True)
    user = models.ForeignKey(User,related_name='Visits',on_delete=models.CASCADE,editable=False)
    vendor = models.ForeignKey(Vendor,blank=True,on_delete=models.CASCADE,editable=False)
    content = models.CharField(max_length=300,blank=True,null=True)
    created_at = models.DateTimeField(auto_now=True,editable=False)
    location_score = models.FloatField(editable=False,null=True)
    public = models.BooleanField(default=True)
    ratings = models.IntegerField(validators=[MinValueValidator(0),MaxValueValidator(5)],default=3)


    class Meta:
        verbose_name = 'Visited Place'
        verbose_name_plural ='Visited Places' 

    def __str__(self):
        return str(self.user)+' - '+str(self.vendor) 


# class Leaderboard(models.Model):
#   Create a Leaderboard Table which stores the user and total score

