# Generated by Django 4.2 on 2023-10-31 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_alter_product__id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='_id',
            field=models.CharField(blank=True, editable=False, max_length=6, primary_key=True, serialize=False, unique=True),
        ),
        migrations.AlterField(
            model_name='product',
            name='_id',
            field=models.AutoField(editable=False, primary_key=True, serialize=False),
        ),
    ]
