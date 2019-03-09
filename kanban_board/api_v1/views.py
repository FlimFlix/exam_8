from rest_framework import viewsets
from webapp.models import Task
from api_v1.serializers import TaskCreateSerializer, TaskDisplaySerializer


class NoAuthModelViewSet(viewsets.ModelViewSet):
    authentication_classes = []


class TaskViewSet(NoAuthModelViewSet):
    queryset = Task.objects.all().order_by('status', '-due_date')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return TaskDisplaySerializer
        else:
            return TaskCreateSerializer

    def perform_destroy(self, instance):
        instance.save()

