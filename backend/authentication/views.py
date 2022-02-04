from django.contrib.auth import get_user_model
from rest_framework import viewsets, status, mixins
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (CustomObtainPairSerializer,
                        UserSerializer,
                        RegisterUserSerializer,
                        GetSearchedUserSerializer)
from utils.permissions import IsTheSameUserOrReadOnly,IsTheSameUser
from .models import User
from django.db.models import Q


class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomObtainPairSerializer


class UserViewSet(mixins.ListModelMixin,
                mixins.RetrieveModelMixin,
                mixins.DestroyModelMixin,
                viewsets.GenericViewSet):

    permission_classes = [IsTheSameUser]
    parser_classes = [MultiPartParser,FormParser, JSONParser]
    queryset = get_user_model().objects.all().filter(is_vendor=False)
    serializer_class = UserSerializer
    lookup_field = 'uuid'

    def get_permissions(self):
        if self.action in ['create']:
            return [AllowAny(), ]
        return super(UserViewSet,self).get_permissions()

    def create(self, request, *args, **kwargs):
        register_serializer = RegisterUserSerializer(data=request.data)
        if register_serializer.is_valid():
            new_user = register_serializer.save()
            if new_user:
                return Response(register_serializer.data,status = status.HTTP_201_CREATED)


        return Response(register_serializer.errors,status = status.HTTP_400_BAD_REQUEST)

    def partial_update(self, request, *args, **kwargs):
        current_user = self.get_object()
        if 'action' in request.data:
            action = request.data['action']
            if 'follow_uuid' in request.data:
                user_to_perform_action = get_user_model().objects.get(uuid=request.data['follow_uuid'])
                if action == 'FOLLOW':
                    if user_to_perform_action in current_user.following.all():
                        return Response({
                            'message': 'The user has already been followed'
                        }, status=status.HTTP_400_BAD_REQUEST)
                    current_user.following.add(user_to_perform_action)

                elif action == 'UNFOLLOW':
                    if user_to_perform_action not in current_user.following.all():
                        return Response({
                            'message': 'The user is not yet followed'
                        }, status=status.HTTP_400_BAD_REQUEST)
                    current_user.following.remove(user_to_perform_action)

        user_serializer = UserSerializer(data=request.data, instance=current_user, partial=True,
                                         context={'request': request})

        if not user_serializer.is_valid():
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        user_serializer.save()
        return Response(user_serializer.data, status=status.HTTP_200_OK)


class GetUserViewSet(mixins.ListModelMixin,viewsets.GenericViewSet):
    queryset = User.objects.all().filter(is_vendor=False)
    serializer_class = GetSearchedUserSerializer

    def list(self,request,*args,**kwargs):
        query = request.GET.get('user')
        # query = query['user'] if 'user' in query else None
        if query is not None:
            lookups = Q(username__icontains=query) | Q(first_name__icontains=query) | Q(last_name__icontains=query)
            queryset = self.filter_queryset(self.get_queryset().filter(lookups))
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)

            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        return Response({"detail":"No query received for search"})

