from tabnanny import verbose
from django.contrib import admin
from .models import *

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ['id','name','email']

@admin.register(Batches)
class BatchAdmin(admin.ModelAdmin):
    list_display = ['id','batch_name']
    class Meta:
        verbose_name = 'Batches'