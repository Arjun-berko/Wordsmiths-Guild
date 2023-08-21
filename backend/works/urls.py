from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

urlpatterns = [path("<int:pk>",views.PostRetrieveAPIView.as_view()),
               path("list",views.PostListAPIView.as_view()),
               path("create",views.PostCreateAPIView.as_view()),
               path("list/<str:username>",views.UserPostListAPIView.as_view()),
               path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
               path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
               path('token/verify',TokenVerifyView.as_view(),name="token_verify")
               ]