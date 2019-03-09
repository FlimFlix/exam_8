from django.contrib import admin
from webapp.models import Task


class TaskAdmin(admin.ModelAdmin):
    list_display = ['pk', 'summary', 'status']
    search_fields = ['summary', 'id']


admin.site.register(Task, TaskAdmin)
