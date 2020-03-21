import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { TasksService } from '../services/tasks.service';
import { TaskModel } from '../models/task.model';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-calendar-body',
  template: `
    <div class="row mb-3">
      <div class="col col-auto">{{ date | date: 'EEEE' }}</div>
      <div class="col">{{ date | date: 'dd.MM.yyyy' }}</div>
      <div class="col col-auto">
        <button class="btn btn-link text-uppercase text-orange">Go to timesheet</button>
      </div>
    </div>
    <div class="row">
      <div class="col scrollable">
        <app-task-hours-group *ngIf="hourTasks.length" [tasks]="hourTasks"></app-task-hours-group>
        <app-task-expenses-group *ngIf="expenseTasks.length" [tasks]="expenseTasks"></app-task-expenses-group>
        <app-task-additional-hours-group *ngIf="additionalHourTasks.length" [tasks]="additionalHourTasks"></app-task-additional-hours-group>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
      `.scrollable {
      max-height: 400px;
      overflow-y: auto;
    }`,
  ],
})
export class CalendarBodyComponent implements OnInit, OnDestroy {
  public date: Date;
  public hourTasks: Array<TaskModel> = [];
  public expenseTasks: Array<TaskModel> = [];
  public additionalHourTasks: Array<TaskModel> = [];

  private tasks: Array<TaskModel> = [];
  private subs = new Subscription();

  constructor(private calendar: CalendarService, private tasksService: TasksService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subs.add(
      this.tasksService.get().pipe(take(1)).subscribe(this.handleTasks.bind(this)),
    );

    this.subs.add(
      this.calendar.onDaySelected().subscribe(this.handleSelectedDay.bind(this)),
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private handleSelectedDay(): void {
    const date = this.calendar.getSelectedDay().date;
    if (date !== this.date) {
      this.date = date;
      this.handleTasks();
    }
  }

  private handleTasks(): void {
    this.tasks = this.tasksService.tasksForDay(this.date);
    this.hourTasks = this.tasks.filter(item => item.isHoursEventType);
    this.expenseTasks = this.tasks.filter(item => item.isExpenseType);
    this.additionalHourTasks = this.tasks.filter(item => item.isAdditionalHoursEventType);
    this.ref.markForCheck();
  }

}
