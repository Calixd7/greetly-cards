# Generated by Django 3.1.6 on 2021-02-09 02:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_auto_20210209_0127'),
    ]

    operations = [
        migrations.AddField(
            model_name='card',
            name='backgroundcolor',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='card',
            name='backgroundopacity',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='card',
            name='textbackgroundcolor',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='card',
            name='textbackgroundopacity',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]