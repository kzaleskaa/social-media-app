# Generated by Django 3.1 on 2022-04-20 22:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='nickname',
            field=models.CharField(default=None, max_length=255, unique=True),
        ),
    ]
