from rest_framework.response import Response
from utils.permissions import IsTheSameUser
from .models import VisitedPlaces
from .serializers import DashboardSerializer, LeaderboardSerializer, VendorSerializer, VisitedPlacesSerializer, RegisterVisitSerializer
from utils.utils import get_distance
from utils.permissions import IsAuthorOrReadOnly,IsStaffOrReadOnly,ReadOnly,VisitedPlacesThrottle
from rest_framework.permissions import IsAuthenticatedOrReadOnly,IsAuthenticated
from django.db.models import Count,Sum,Value,F,Q
from rest_framework import viewsets, status, mixins,status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from authentication.models import User,Vendor

# Create your views here.


class VendorViewSet(mixins.RetrieveModelMixin,mixins.ListModelMixin,mixins.CreateModelMixin,viewsets.GenericViewSet):

    permission_classes = [IsStaffOrReadOnly]
    parser_classes = [MultiPartParser,FormParser]
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    lookup_field = 'id'


        
class VisitedPlacesViewSet(mixins.ListModelMixin,
                            mixins.CreateModelMixin,
                            viewsets.GenericViewSet):

    permission_classes = [IsAuthorOrReadOnly,IsAuthenticatedOrReadOnly]
    parser_classes = [MultiPartParser,FormParser,JSONParser]
    queryset = VisitedPlaces.objects.filter(public=True)
    serializer_class = VisitedPlacesSerializer
    lookup_field = 'id'
    throttle_classes = (VisitedPlacesThrottle,)
    
    def create(self,request,**kwargs):
        json_data = (request.data).copy()
        id = request.user.id
        json_data.update({"user":id})
        vendor = Vendor.objects.filter(id=json_data['vendor'])
        distance = get_distance(request.user.latest_latitude,request.user.latest_longitude,vendor.values('latitide')[0]['latitide'],vendor.values('longitude')[0]['longitude'])
        distance_score = distance/20000
        importance_score = vendor.values('importance_point')[0]['importance_point']
        json_data['location_score'] = distance_score + importance_score

        request.user.latest_latitude = json_data['latitude']
        request.user.latest_longitude = json_data['longitude']
        request.user.save()
        
        register_serializer = RegisterVisitSerializer(data=json_data)
        
        if register_serializer.is_valid():
            new_visit = register_serializer.save(user=request.user,vendor=Vendor.objects.get(id=json_data['vendor']))
            if new_visit:
                return Response(register_serializer.data,status=status.HTTP_201_CREATED)
        
        return Response(register_serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
    

class GlobalLeaderboardViewSet(mixins.ListModelMixin,
                        viewsets.GenericViewSet):
    
    leaderboard = VisitedPlaces.objects.all().values('user').annotate(unique_visits=Count('vendor',distinct=True),visits=Count('user'),score = Sum('location_score')).order_by(F('score').desc())
    queryset = leaderboard
    permission_classes = [ReadOnly]
    serializer_class = LeaderboardSerializer

class FollowingLeaderboardViewSet(mixins.ListModelMixin,
                                viewsets.GenericViewSet):
    leaderboard = VisitedPlaces.objects.all()
    queryset = leaderboard
    permission_classes = [IsAuthenticated]
    serializer_class = LeaderboardSerializer

    def list(self, request, *args, **kwargs):
        # print(self.filter_queryset(self.get_queryset().values('user')))
        query = request.user.following.all().values('id')
        query_filter = Q()
        for i in query:
            print(i['id'])
            query_filter = query_filter | Q(user = i['id'])
        queryset = self.filter_queryset(self.get_queryset().filter(query_filter).values('user').annotate(unique_visits=Count('vendor',distinct=True),visits=Count('user'),score = Sum('location_score')).order_by(F('score').desc()))
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
        
# Landing Page view includes total user, total vendor, total qr scans 
# Dashboard: user_uuid, user_id, username, user_profile_picture, user_score, user_visited_place

class DashboardViewSet(viewsets.GenericViewSet):
    queryset = VisitedPlaces.objects.all()
    permission_classes = [IsTheSameUser]
    serializer_class = DashboardSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(user=request.user).annotate(score=F('location_score')).order_by('created_at'))
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

