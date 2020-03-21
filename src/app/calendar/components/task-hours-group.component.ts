import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TaskModel } from '../models/task.model';
import * as moment from 'moment';
import { millisToHourFormat } from '../../../utils/date.helpers';

@Component({
  selector: 'app-task-hours-group',
  template: `
    <app-task-group header="Hours" icon="clock">
      <small class="text-muted" group-subheader>({{ startTime | date: 'HH:mm' }} - {{ endDate | date: 'HH:mm' }})</small>

      <div class="row text-muted mb-2">
        <div class="col">Type</div>
        <div class="col col-auto text-right">Duration</div>
      </div>
      <div class="row" *ngFor="let task of tasks">
        <div class="col">{{ task.eventType }}</div>
        <div class="col col-auto text-right">{{ getDuration(task) }}</div>
      </div>
    </app-task-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskHoursGroupComponent implements OnChanges {
  @Input() tasks: Array<TaskModel> = [];

  public startTime: Date;
  public endDate: Date;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tasks.currentValue !== changes.tasks.previousValue) {
      this.handleTasks();
    }
  }

  public getDuration(task: TaskModel): string {
    return millisToHourFormat(
      moment(task.lastTaskEnd).diff(task.firstTaskStart),
    );
  }

  private handleTasks(): void {
    this.startTime = null;
    this.endDate = null;

    this.tasks.forEach(item => {
      if (!this.startTime || this.startTime > item.firstTaskStart) {
        this.startTime = item.firstTaskStart;
      }

      if (!this.endDate || this.endDate < item.lastTaskEnd) {
        this.endDate = item.lastTaskEnd;
      }
    });
  }
}
