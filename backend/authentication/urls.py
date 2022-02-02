from django.urls import path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (CustomTokenObtainPairView,
                    UserViewSet,
                    GetUserViewSet)


app_name = 'authentication'
router = DefaultRouter()

router.register('user',UserViewSet)
router.register('searchuser',GetUserViewSet)

urlpatterns=[
    path('token/',CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(),name='token_refresh')
]