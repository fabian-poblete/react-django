from rest_framework import serializers
from .models import Task

# Convierte tipos de datos de Python a JSON


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # fields = ('id', 'title', 'description', 'done')
        fields = '__all__'
