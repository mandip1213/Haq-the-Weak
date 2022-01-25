from django.contrib import admin
from .models import *
# Register your models here.

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ['id','name','location']

@admin.register(VisitedPlaces)
class VisitedPlaceAdmin(admin.ModelAdmin):
    list_display = ['id','user','vendor']