from rest_framework import serializers
from .models import *
from authentication.models import User

class VisitedPlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitedPlaces
        fields = ('id','user','vendor','content','public')

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = '__all__'

class LeaderboardSerializer(serializers.ModelSerializer):
    user = serializers.UUIDField()
    visits = serializers.IntegerField()
    unique_visits = serializers.IntegerField()
    username = serializers.SerializerMethodField()
    user_uuid = serializers.SerializerMethodField()
    user_profile_picture = serializers.SerializerMethodField()
    score = serializers.FloatField()

    class Meta:
        model = VisitedPlaces
        fields = ('user','visits','unique_visits','username','user_uuid','user_profile_picture','score')



    def get_username(self,obj):
        new_user = User.objects.get(id=obj['user'])
        return new_user.username

    def get_user_uuid(self,obj):
        new_user = User.objects.get(id=obj['user'])
        return new_user.uuid

    def get_user_profile_picture(self,obj):
        new_user = User.objects.get(id=obj['user'])
        print(new_user.profile_picture)

        try:
            return new_user.profile_picture.url
        except:
            return ''
