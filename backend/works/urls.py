from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [path("<int:pk>",views.PostRetrieveAPIView.as_view(),name="post detail"),
               path("list",views.PostListAPIView.as_view(),name="post list"),
               path("create",views.PostCreateAPIView.as_view(),name="post create"),
               path("list/<str:username>",views.UserPostListAPIView.as_view(),name="user post list"),
               path("delete/<int:pk>",views.PostDestroyAPIView.as_view(),name="post delete"),
               path("update/<int:pk>",views.PostUpdateAPIView.as_view(),name="post update"),
               # JWT token views
               path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
               path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
               path('token/verify',TokenVerifyView.as_view(),name="token_verify")
               ] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)