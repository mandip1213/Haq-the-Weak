from tabnanny import verbose
from django.contrib import admin
from .models import *

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','first_name','email']

@admin.register(Batches)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['id','batch_name']

@admin.register(Vendor)
class VendorAdmin(admin.ModelAdmin):
    list_display = ['id','name']