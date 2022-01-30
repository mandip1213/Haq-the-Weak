# Generated by Django 3.2.11 on 2022-01-30 05:19

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
                ('location', models.CharField(choices=[('Kathmandu', 'Kathmandu'), ('Taplejung', 'Taplejung'), ('Panchthar', 'Panchthar'), ('Illam', 'Illam'), ('Jhapa', 'Jhapa'), ('Terathum', 'Terathum'), ('Dhankuta', 'Dhankuta'), ('Morang', 'Morang'), ('Sunsari', 'Sunsari'), ('Okhaldhunga', 'Okhaldunga'), ('Udayapur', 'Udayapur'), ('Saptari', 'Saptari'), ('Siraha', 'Siraha'), ('Sindhuli', 'Sindhuli'), ('Dhanusa', 'Dhanusa'), ('Mohottari', 'Mohottari'), ('Sarlahi', 'Sarlahi'), ('Rautahat', 'Rautahat'), ('Bara', 'Bara'), ('Parsa', 'Parsa'), ('Makwanpur', 'Makwanpur'), ('Nuwakot', 'Nuwakot'), ('Rasuwa', 'Rasuwa'), ('Kavre', 'Kavre'), ('Sindhupalchok', 'Sindhupalchok'), ('Dolakha', 'Dolakha'), ('Dhanding', 'Dhanding'), ('Chitwan', 'Chitwan'), ('Lalitpur', 'Lalitpur'), ('Ramechhap', 'Ramechhap'), ('Myagdi', 'Myagdi'), ('Gorkha', 'Gorkha'), ('Lamjung', 'Lamjung'), ('Tanahun', 'Tanahun'), ('Kaski', 'Kaski'), ('Parbat', 'Parbat'), ('Baglung', 'Baglung'), ('Syangja', 'Syangja'), ('Palpa', 'Palpa'), ('Gulmi', 'Gulmi'), ('Rupandehi', 'Rupandehi'), ('Nawalparasi', 'Nawalparasi'), ('Kapilbastu', 'Kapilbastu'), ('Argakhachi', 'Argakhachi'), ('Dang', 'Dang'), ('Salyan', 'Salyan'), ('Pyuthan', 'Pyuthan'), ('Rolpa', 'Rolpa'), ('Surkhet', 'Surkhet'), ('Banke', 'Banke'), ('Bardiya', 'Bardiya'), ('Kailali', 'Kailali'), ('Dadeldhura', 'Dadeldhura'), ('Doti', 'Doti'), ('Baitadi', 'Baitadi'), ('Kanchanpur', 'Kanchanpur'), ('Bhaktapur', 'Bhaktapur'), ('Dailekh', 'Dailekh'), ('Achham', 'Achham'), ('Rukum', 'Rukum'), ('Kalikot', 'Kalikot'), ('Jumla', 'Jumla'), ('Darchula', 'Darchula')], max_length=150)),
                ('contact', models.CharField(blank=True, max_length=50, null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='places/')),
                ('type_of_place', models.CharField(max_length=100)),
                ('is_sponsor', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'Vendor',
                'verbose_name_plural': 'Vendors',
            },
        ),
        migrations.CreateModel(
            name='VisitedPlaces',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('content', models.CharField(blank=True, max_length=300, null=True)),
                ('created_at', models.DateTimeField(auto_now=True)),
                ('location_score', models.FloatField(editable=False, null=True)),
                ('public', models.BooleanField(default=True)),
                ('user', models.ForeignKey(editable=False, on_delete=django.db.models.deletion.CASCADE, related_name='Visits', to=settings.AUTH_USER_MODEL)),
                ('vendor', models.ForeignKey(blank=True, editable=False, on_delete=django.db.models.deletion.CASCADE, to='tripping.vendor')),
            ],
            options={
                'verbose_name': 'Visited Place',
                'verbose_name_plural': 'Visited Places',
            },
        ),
    ]
