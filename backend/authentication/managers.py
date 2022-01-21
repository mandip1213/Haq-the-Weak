from django.contrib.auth.base_user import BaseUserManager

class UserManager(BaseUserManager):
    def create_user(self,email,password,**extra_fields):
        """Create a User and Save it with given email and password"""
        email = self.normalize_email(email=email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,email,password,**extra_fields):
        """Create Superuser and save it woith given email and password"""
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('SuperUser must have is staff as True')

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have superuser as True')

        if extra_fields.get('is_active') is not True:
            raise ValueError('SuperUser must be an active user')

        superuser = self.create_user(email,password,**extra_fields)
        return superuser
