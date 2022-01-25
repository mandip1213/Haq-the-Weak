from rest_framework.response import Response
from .models import Vendor,VisitedPlaces
from .serializers import LeaderboardSerializer, VendorSerializer, VisitedPlacesSerializer
from rest_framework.views import APIView
from utils.permissions import IsAuthorOrReadOnly,ReadOnly
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from django.db.models import Count,Sum
from rest_framework import viewsets, status, mixins,status,generics
from rest_framework.parsers import MultiPartParser, FormParser
# Create your views here.

class VendorViewSet(mixins.RetrieveModelMixin,mixins.ListModelMixin,viewsets.GenericViewSet):

    permission_classes = [ReadOnly]
    parser_classes = [MultiPartParser,FormParser]
    queryset = Vendor.objects.all()
    serializer_class = VendorSerializer
    lookup_field = 'id'


# class VisitedPlaceAPIView(mixins.ListModelMixin,
#                         mixins.CreateModelMixin,
#                         viewsets.GenericViewSet):

#     parser_classes = [MultiPartParser,FormParser]
#     queryset = VisitedPlaces.objects.all()
#     serializer_class = VisitedPlacesSerializer
#     lookup_field = 'id'

#     def create(self, request,**kwargs):
#         print(request.data)
#         register_serializer = VisitedPlacesSerializer(data=request.data)
        
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
    
    leaderboard = VisitedPlaces.objects.all().values('user').annotate(unique_visits=Count('vendor',distinct=True),visits=Count('user'),score = Sum('location_score')).order_by('score')
    queryset = leaderboard
    permission_classes = [ReadOnly]
    serializer_class = LeaderboardSerializer
