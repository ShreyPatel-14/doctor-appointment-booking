# Generated by Django 4.2.5 on 2023-10-04 10:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("api", "0002_remove_doctor_user_remove_profile_user_and_more"),
    ]

    operations = [
        migrations.CreateModel(
            name="Profile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("is_doctor", models.BooleanField(default=False)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Doctor",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=40)),
                ("email", models.EmailField(max_length=254)),
                ("gender", models.CharField(max_length=10)),
                ("contact", models.CharField(max_length=10, unique=True)),
                ("specialisation", models.CharField(max_length=50)),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Appointment",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("firstname", models.CharField(max_length=40)),
                ("lastname", models.CharField(max_length=40)),
                ("gender", models.CharField(max_length=10)),
                ("age", models.IntegerField(default=0)),
                ("weight", models.FloatField()),
                ("contact", models.CharField(max_length=10, unique=True)),
                ("address", models.TextField()),
                ("date", models.DateField()),
                ("specialisation_1", models.CharField(max_length=40)),
                ("doctor_name", models.CharField(max_length=40)),
                ("status_bit", models.IntegerField(default=1)),
                ("visited_bit", models.IntegerField(default=0)),
                ("time_slot", models.CharField(max_length=20)),
                (
                    "doctor",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="api.doctor"
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]