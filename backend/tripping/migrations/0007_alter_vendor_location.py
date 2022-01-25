# Generated by Django 3.2.11 on 2022-01-24 09:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tripping', '0006_alter_vendor_is_sponsor'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vendor',
            name='location',
            field=models.CharField(choices=[('Kathmandu', 'Kathmandu'), ('Taplejung', 'Taplejung'), ('Panchthar', 'Panchthar'), ('Illam', 'Illam'), ('Jhapa', 'Jhapa'), ('Terathum', 'Terathum'), ('Dhankuta', 'Dhankuta'), ('Morang', 'Morang'), ('Sunsari', 'Sunsari'), ('Okhaldhunga', 'Okhaldunga'), ('Udayapur', 'Udayapur'), ('Saptari', 'Saptari'), ('Siraha', 'Siraha'), ('Sindhuli', 'Sindhuli'), ('Dhanusa', 'Dhanusa'), ('Mohottari', 'Mohottari'), ('Sarlahi', 'Sarlahi'), ('Rautahat', 'Rautahat'), ('Bara', 'Bara'), ('Parsa', 'Parsa'), ('Makwanpur', 'Makwanpur'), ('Nuwakot', 'Nuwakot'), ('Rasuwa', 'Rasuwa'), ('Kavre', 'Kavre'), ('Sindhupalchok', 'Sindhupalchok'), ('Dolakha', 'Dolakha'), ('Dhanding', 'Dhanding'), ('Chitwan', 'Chitwan'), ('Lalitpur', 'Lalitpur'), ('Ramechhap', 'Ramechhap'), ('Myagdi', 'Myagdi'), ('Gorkha', 'Gorkha'), ('Lamjung', 'Lamjung'), ('Tanahun', 'Tanahun'), ('Kaski', 'Kaski'), ('Parbat', 'Parbat'), ('Baglung', 'Baglung'), ('Syangja', 'Syangja'), ('Palpa', 'Palpa'), ('Gulmi', 'Gulmi'), ('Rupandehi', 'Rupandehi'), ('Nawalparasi', 'Nawalparasi'), ('Kapilbastu', 'Kapilbastu'), ('Argakhachi', 'Argakhachi'), ('Dang', 'Dang'), ('Salyan', 'Salyan'), ('Pyuthan', 'Pyuthan'), ('Rolpa', 'Rolpa'), ('Surkhet', 'Surkhet'), ('Banke', 'Banke'), ('Bardiya', 'Bardiya'), ('Kailali', 'Kailali'), ('Dadeldhura', 'Dadeldhura'), ('Doti', 'Doti'), ('Baitadi', 'Baitadi'), ('Kanchanpur', 'Kanchanpur'), ('Bhaktapur', 'Bhaktapur'), ('Dailekh', 'Dailekh'), ('Achham', 'Achham'), ('Rukum', 'Rukum'), ('Kalikot', 'Kalikot'), ('Jumla', 'Jumla'), ('Darchula', 'Darchula')], max_length=150),
        ),
    ]