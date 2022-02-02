from rest_framework.routers import DefaultRouter

from .views import (DashboardViewSet,
                    VendorViewSet,
                    VisitedPlacesViewSet,
                    GlobalLeaderboardViewSet,
                    LandingPageViewSet,
                    FollowingLeaderboardViewSet,
                    PublicVisitedPlacesViewSet,
                    ActivityFeedViewSet)

router = DefaultRouter()
router.register('vendor',VendorViewSet)
router.register('visit',VisitedPlacesViewSet)
router.register('leaderboard',GlobalLeaderboardViewSet)
router.register('dashboard',DashboardViewSet)
router.register('index',LandingPageViewSet)
router.register('following-leaderboard',FollowingLeaderboardViewSet)
router.register('public-visit',PublicVisitedPlacesViewSet)
router.register('feed',ActivityFeedViewSet)
urlpatterns = []
