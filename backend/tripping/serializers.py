from dataclasses import field
from rest_framework import serializers
from django.db.models import Avg
from authentication.serializers import UserSerializer,PublicUserSerializer
from .models import *
from authentication.models import User

class VendorSerializer(serializers.ModelSerializer):
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Vendor
        fields = ('id',
                'name',
                'location',
                'latitude',
                'longitude',
                'contact',
                'image',
                'type_of_place',
                'rating',
                )

    def get_rating(self,obj):
        visits = VisitedPlaces.objects.all().filter(vendor=obj.id)
        if visits.exists():
            average_rating = visits.aggregate(Avg('ratings'))
            return str(average_rating['ratings__avg'])
        return None



class VisitedPlacesSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitedPlaces
        fields = ('id','user','vendor','content','public')


class RegisterVisitSerializer(serializers.ModelSerializer):
    location_score = serializers.FloatField()
    
    class Meta:
        model = VisitedPlaces
        fields = ('id','user','vendor','content','public','location_score','ratings')



class   LeaderboardSerializer(serializers.ModelSerializer):
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
        
        try:
            return new_user.profile_picture.url
        except:
            return None


class DashboardVendorSerializer(serializers.ModelSerializer):
    visits = serializers.SerializerMethodField()
    unique_visits = serializers.SerializerMethodField()
    class Meta:
        model = Vendor
        fields = ('name','location','image','type_of_place','visits','unique_visits')

    def get_visits(self,obj):
        visited_places = VisitedPlaces.objects.all().filter(vendor=obj)
        return visited_places.count()

    def get_unique_visits(self,obj):
        visited_places = VisitedPlaces.objects.all().filter(vendor=obj).distinct()
        return visited_places.count()
    
class DashboardSerializer(serializers.ModelSerializer):
    id = serializers.UUIDField()
    user = PublicUserSerializer()
    vendor = DashboardVendorSerializer()
    score = serializers.FloatField()
    created_at = serializers.DateTimeField()
    class Meta:
        model = VisitedPlaces
        fields= ('id','user','vendor','score','created_at')

class ActivityFeedSerializer(serializers.ModelSerializer):
    user = PublicUserSerializer()
    vendor = VendorSerializer()

    class Meta:
        model = VisitedPlaces
        fields = ('user','content','vendor','ratings','created_at')