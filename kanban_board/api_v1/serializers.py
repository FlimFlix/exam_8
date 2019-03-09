from rest_framework import serializers
from webapp.models import Task


class TaskCreateSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:task-detail')

    class Meta:
        model = Task
        fields = ('url', 'id', 'summary', 'description', 'due_date', 'status', 'time_planned')


class TaskDisplaySerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='api_v1:task-detail')
    label = serializers.CharField(source='get_status_display', read_only=True)

    class Meta:
        model = Task
        fields = ('url', 'id', 'summary', 'description', 'due_date', 'status', 'time_planned', 'label')

