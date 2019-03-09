from django.db import models


TASK_STATUS_CHOICES = [
    ('turn', 'Очередь'),
    ('underway', 'В работе'),
    ('done', 'Сделано'),
]


class Task(models.Model):
    summary = models.CharField(max_length=255)
    description = models.TextField(max_length=2000, null=True, blank=True)
    due_date = models.DateTimeField()
    status = models.CharField(max_length=20, choices=TASK_STATUS_CHOICES, default='turn')
    time_planned = models.DecimalField(max_digits=4, decimal_places=1, null=True, blank=True)

    def __str__(self):
        return "%s (%s)" % (self.summary, self.status)
