# Generated by Django 3.2.11 on 2022-01-23 16:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tripping', '0004_auto_20220123_2224'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visitedplaces',
            name='public',
            field=models.BooleanField(default=True),
        ),
    ]
