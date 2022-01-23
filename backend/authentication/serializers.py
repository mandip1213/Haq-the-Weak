from builtins import staticmethod #like classmethod 
from django.contrib.auth import get_user_model
from .models import Batches
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.settings import api_settings
from django.contrib.auth.models import update_last_login



class CustomObtainPairSerializer(TokenObtainPairSerializer):
    #takes the token
    @classmethod
    def get_token(cls, user):
        token =  super().get_token(user)
        token['username'] = user.username
        return token
    
    def validate(self, attrs):
        data = super().validate(attrs)

        refresh = self.get_token(self.user)

        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        data['uuid'] = str(self.user.uuid)
        if api_settings.UPDATE_LAST_LOGIN:
            update_last_login(None, self.user)

        return data

        
class FollowerOrFollowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = (
            'name',
            'username',
            'profile_picture',
        )
class BatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Batches
        fields = (
            'batch_name',
            'batch_photo',
        )

class UserSerializer(serializers.ModelSerializer):
    followers_count = serializers.SerializerMethodField()
    following_count = serializers.SerializerMethodField()
    followers = FollowerOrFollowingSerializer(many=True)
    following = FollowerOrFollowingSerializer(many=True)
    batch = BatchSerializer(many=True)
    batch_count = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ('name',
                'username',
                'profile_picture',
                'uuid',
                'followers_count',
                'following_count',
                'followers',
                'following',
                'batch',
                'batch_count',
                )
        

    @staticmethod
    def get_following_count(self):
        return self.following.count()
    
    @staticmethod
    def get_followers_count(self):
        return self.followers.count()

    @staticmethod
    def get_batch_count(self):
        return self.batch.count()


class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True,required=True,style={'input_type':'password'})
    confirm_password = serializers.CharField(style={'input_type':'password'},write_only=True,label = 'Confirm Password')

    email = serializers.EmailField(validators=[
        UniqueValidator(
            queryset=get_user_model().objects.all(),
            message='This Email is already in use'
        )
    ])

    class Meta:
        model = get_user_model()

        fields = (
            'name',
            'username',
            'email',
            'password',
            'confirm_password',
            'profile_picture',
            'uuid',
            'id',
            'bio',
            'home_town'
        )

        extra_kwargs ={
            'password':
            {'write_only':True},
            'uuid':
                {'read_only':True}
        }

    def validate(self, attrs):
        password = attrs['password']
        confirm_password = attrs['confirm_password']
        if password!=confirm_password:
            raise serializers.ValidationError(
                {
                    'password':"Error:The Passwords didn't match"
                }
            )
        return attrs

    def create(self, validated_data):
        name = validated_data['name']
        email = validated_data['email']
        password = validated_data['password']
        username = validated_data['username']
        bio = validated_data['bio']
        home_town = validated_data['home_town']
        profile_picture = validated_data['profile_picture'] if 'profile_picture' in validated_data else None

        user = self.Meta.model(name=name,email=email,profile_picture=profile_picture,username=username,bio=bio,home_town=home_town)
        user.set_password(password)
        user.save()
        return user