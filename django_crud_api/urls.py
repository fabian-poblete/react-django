from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView  # Import RedirectView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('tasks/', include('tasks.urls')),
    path('', RedirectView.as_view(url='/tasks/')),  # Redirect root URL to API
]