import { ChangeDetectionStrategy, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Component({
  selector: 'app-task-additional-hours-group',
  template: `
    <app-task-group header="Additional hours" icon="clock">
      <div class="row text-muted mb-2">
        <div class="col">Type</div>
        <div class="col col-auto text-right">Amount</div>
      </div>
      <div class="row" *ngFor="let task of tasks">
        <div class="col">{{ task.eventType }}</div>
        <div class="col col-auto text-right">{{ task.quantity | number: '1.2-2' }}</div>
      </div>
    </app-task-group>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskAdditionalHoursGroupComponent {
  @Input() tasks: Array<TaskModel> = [];
}
