from rest_framework.response import Response
from utils.permissions import IsTheSameUser
from .models import Vendor,VisitedPlaces
from .serializers import DashboardSerializer, LeaderboardSerializer, VendorSerializer, VisitedPlacesSerializer
from rest_framework.views import APIView
from utils.permissions import IsAuthorOrReadOnly,ReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from django.db.models import Count,Sum,Value,F
from rest_framework import viewsets, status, mixins,status,generics
from rest_framework.parsers import MultiPartParser, FormParser
from authentication.models import User
# Create your views here.

class VendorViewSet(mixins.RetrieveModelMixin,mixins.ListModelMixin,viewsets.GenericViewSet):

    permission_classes = [ReadOnly]
    parser_classes = [MultiPartParser,FormParser]
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    lookup_field = 'id'


        
class VisitedPlacesViewSet(mixins.ListModelMixin,
                            mixins.CreateModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [IsAuthorOrReadOnly,IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser,FormParser]
    queryset = VisitedPlaces.objects.filter(public=True)
    serializer_class = VisitedPlacesSerializer
    lookup_field = 'id'

    
    def create(self,request,**kwargs):
        json_data = (request.data).copy()
        id = request.user.id
        json_data.update({"user":id})
        register_serializer = VisitedPlacesSerializer(data=json_data)
        
        if register_serializer.is_valid():
            new_visit = register_serializer.save(user=request.user,vendor=Vendor.objects.get(id=json_data['vendor']))
            if new_visit:
                return Response(register_serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(register_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    

class LeaderboardViewSet(mixins.ListModelMixin,
                        viewsets.GenericViewSet):
    
    leaderboard = VisitedPlaces.objects.all().values('user').annotate(unique_visits=Count('vendor',distinct=True),visits=Count('user'),score = Sum('location_score')).order_by(F('score').desc())
    queryset = leaderboard
    permission_classes = [ReadOnly]
    serializer_class = LeaderboardSerializer


# Landing Page view includes total user, total vendor, total qr scans 
# Dashboard: user_uuid, user_id, username, user_profile_picture, user_score, user_visited_place

class DashboardViewSet(viewsets.GenericViewSet):
    queryset = VisitedPlaces.objects.all()
    permission_classes = [IsTheSameUser]
    serializer_class = DashboardSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(user=request.user).annotate(score=F('location_score')))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class LandingPageViewSet(viewsets.GenericViewSet):
    try:
        no_of_vendors = Vendor.objects.all().count()
        no_of_users = User.objects.all().count()
        no_of_visits = VisitedPlaces.objects.all().count()
    except:
        no_of_vendors = 0
        no_of_users =0
        no_of_visits =0
    queryset = VisitedPlaces.objects.all()

    def list(self, request, *args, **kwargs):
        return Response({'vendors':self.no_of_vendors,'users':self.no_of_users,'visits':self.no_of_visits})
