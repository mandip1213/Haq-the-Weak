from rest_framework import permissions
from rest_framework.permissions import BasePermission
from rest_framework.throttling import SimpleRateThrottle

class IsAuthorOrReadOnly(BasePermission):
    message = "Only the Related User can edit the Data!"
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user

class IsTheSameUserOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user


class IsVendorOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return  obj == request.user.vendor

class IsTheSameUser(BasePermission):

    def has_permission(self,request,view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj == request.user

class ReadOnly(BasePermission):

    def has_permission(self,request,views):
        return request.method in permissions.SAFE_METHODS



class VisitedPlacesThrottle(SimpleRateThrottle):

    scope = 'visits'
    
    def get_cache_key(self, request, view):
        # print("views:{}\nrequest:{}".format(view,request.data.get('vendor')))
        if request.user.is_authenticated:
            ident = str(request.user.pk)+str(request.data.get('vendor'))
        else:
            ident = self.get_ident(request)
            
        return self.cache_format % {
            'scope': self.scope,
            'ident': ident
        }

    def parse_rate(self, rate):
        """
        Given the request rate string, return a two tuple of:
        <allowed number of requests>, <period of time in seconds>
        """
        if rate is None:
            return (None, None)
        num, period = rate.split('/')
        num_requests = int(num)
        duration = {'s': 1, 'm': 60, 'h': 3600, 'd': 86400,'w':604800}[period[0]]
        return (num_requests, duration)

class PublicVisitedPlacesThrottle(VisitedPlacesThrottle):
    scope = 'public_visits'

class IsStaffOrReadOnly(BasePermission):

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

    def has_object_permission(self, request, view, obj):
        return request.user.is_staff