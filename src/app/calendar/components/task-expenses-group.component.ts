import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TaskModel } from '../models/task.model';

@Component({
  selector: 'app-task-expenses-group',
  template: `
    <app-task-group header="Expenses" icon="money">
      <div class="row text-muted mb-2">
        <div class="col">Type</div>
        <div class="col col-auto fw-100 text-left">Quantity</div>
        <div class="col col-auto fw-100 text-right">Total</div>
      </div>
      <div class="row" *ngFor="let task of tasks">
        <div class="col">{{ task.eventType }}</div>
        <div class="col col-auto fw-100 text-left">{{ task.quantity | number: '1.0-5' }}</div>
        <div class="col col-auto fw-100 text-right">{{ (task.quantity * task.price) | number: '1.2-2' }}</div>
      </div>
    </app-task-group>
  `,
  styles: [
      `.fw-100 {
      width: 100px;
    }`,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskExpensesGroupComponent {
  @Input() tasks: Array<TaskModel> = [];
}
