# Generated by Django 3.2.11 on 2022-01-24 05:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0005_alter_batches_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='home_town',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]