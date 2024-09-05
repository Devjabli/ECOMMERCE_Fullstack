# Generated by Django 4.2.1 on 2023-06-12 12:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_product_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.CharField(choices=[('PA', 'PANT'), ('SH', 'SHOES'), ('TT', 'TSHIRT'), ('BG', 'BAG'), ('BK', 'BAGPACK'), ('HA', 'HAT'), ('HO', 'HOODIE'), ('PH', 'PHONE'), ('JA', 'JACKETS')], max_length=200),
        ),
    ]