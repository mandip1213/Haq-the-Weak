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


# Dashboard: user_uuid, user_id, username, user_profile_picture, score, visited_place
class DashboardSerializer(serializers.ModelSerializer):
    user = serializers.UUIDField()
    user_uuid = serializers.SerializerMethodField()
    score=serializers.FloatField()
    username=serializers.SerializerMethodField()
    user_profile_picture = serializers.SerializerMethodField()
    visited_places = serializers.SerializerMethodField()

    class Meta:
        model = VisitedPlaces
        fields = ('user','user_uuid','username','user_profile_picture','score','visited_places','score')

    def get_user_uuid(self,obj):
        new_user = User.objects.get(id=obj['user'])
        return new_user.uuid
    
   

    def get_username(self,obj):
        new_user = User.objects.get(id=obj['user'])
        return new_user.username


    def get_user_profile_picture(self,obj):
        new_user = User.objects.get(id=obj['user'])
        
        try:
            return new_user.profile_picture.url
        except:
            return None

    def get_visited_places(self,obj):
        visited_places = VisitedPlaces.objects.filter(user=obj['user'])
        listed = visited_places.values('vendor')
        final_list = []
        for i in listed.iterator():
            new_queryset = Vendor.objects.filter(id=i['vendor'])
            for j in new_queryset.values('name').iterator():
                final_list.append(j['name'])
        final_list = list(dict.fromkeys(final_list))
        return final_list

