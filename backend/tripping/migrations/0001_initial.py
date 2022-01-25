# Generated by Django 3.2.11 on 2022-01-22 14:37

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Vendor',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('name', models.CharField(max_length=150)),
                ('location', models.CharField(max_length=150)),
                ('contact', models.CharField(max_length=50)),
                ('image', models.ImageField(blank=True, null=True, upload_to='places/')),
                ('type_of_place', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name': 'Vendor',
                'verbose_name_plural': 'Vendors',
            },
        ),
        migrations.CreateModel(
            name='VisitedPlaces',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=300)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Visits', to=settings.AUTH_USER_MODEL)),
                ('vendor', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='tripping.vendor')),
            ],
        ),
    ]
