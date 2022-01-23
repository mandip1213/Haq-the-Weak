from rest_framework import permissions
from rest_framework.permissions import BasePermission

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


class ReadOnly(BasePermission):

    def has_permission(self, request, view):
        return request.method in permissions.SAFE_METHODS

