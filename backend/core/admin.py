from django.contrib import admin
from core.models import User, Card, UserFollowing

# Register your models here.
admin.site.register(User)
admin.site.register(Card)
admin.site.register(UserFollowing)
