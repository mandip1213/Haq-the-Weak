from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(VisitedPlaces)
class VisitedPlaceAdmin(admin.ModelAdmin):
    list_display = ['id','user','vendor']