from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import VendorViewSet,VisitedPlacesViewSet,LeaderboardViewSet
router = DefaultRouter()
router.register('vendor',VendorViewSet)
router.register('visit',VisitedPlacesViewSet)
router.register('leaderboard',LeaderboardViewSet)
urlpatterns = []
