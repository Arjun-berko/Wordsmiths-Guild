from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [path("profile/<str:username>",views.UserProfileDetailAPIView.as_view()),
               path("register",views.UserCreateAPIView.as_view(),name="user registration")
               ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)