from rest_framework.routers import DefaultRouter

from .views import DashboardViewSet, VendorViewSet,VisitedPlacesViewSet,LeaderboardViewSet,LandingPageViewSet

router = DefaultRouter()
router.register('vendor',VendorViewSet)
router.register('visit',VisitedPlacesViewSet)
router.register('leaderboard',LeaderboardViewSet)
router.register('dashboard',DashboardViewSet)
router.register('index',LandingPageViewSet)

urlpatterns = []
