from rest_framework.routers import DefaultRouter

from django.urls import include,path

from authentication.urls import router as user_router
from tripping.urls import router as trip_router

app_name = 'api'
urlpatterns = [
    path('auth/',include('authentication.urls',namespace = 'authentication')),

]

router = DefaultRouter()
router.registry.extend(user_router.registry)
router.registry.extend(trip_router.registry)

urlpatterns += router.urls
