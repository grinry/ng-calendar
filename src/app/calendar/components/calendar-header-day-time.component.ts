import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DayModel } from '../models/day.model';
import { Subscription } from 'rxjs';
import { TasksService } from '../services/tasks.service';
import { TaskModel } from '../models/task.model';
import * as moment from 'moment';
import { millisToHourFormat } from '../../../utils/date.helpers';

type DayState = 'rejected' | 'approved' | 'mixed' | 'none';

@Component({
  selector: 'app-calendar-header-day-time',
  template: `
    <time class="mx-auto mt-1 small">{{ time || '-' }}</time>
    <div [hidden]="state == 'none'"
         class="indicator mx-auto"
         [class.bg-red]="state == 'rejected'"
         [class.bg-green]="state == 'approved'"
         [class.bg-grey]="state == 'mixed'"></div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
      `.time {
    }`,
      `.indicator {
      border-radius: 50%;
      width: 5px;
      height: 5px;
    }`,
  ],
})
export class CalendarHeaderDayTimeComponent implements OnInit, OnDestroy, OnChanges {
  @Input() day: DayModel;

  public time: string = null;
  public state: DayState = null;

  private subs = new Subscription();
  private tasks: Array<TaskModel> = [];

  constructor(private tasksService: TasksService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subs.add(
      this.tasksService.onTasksUpdated().subscribe(this.handleTasks.bind(this)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const day = changes.day;
    if (day.currentValue !== day.previousValue) {
      this.handleTasks();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private handleTasks() {
    this.tasks = this.tasksService.tasksForDay(this.day.date).filter(item => item.isHoursEventType);
    this.calculateTime();
    this.resolveState();
    this.ref.markForCheck();
  }

  private calculateTime(): void {
    if (!this.tasks.length) {
      this.time = null;
      return;
    }

    const millisWorked = this.tasks
      .map(item => moment(item.lastTaskEnd).diff(item.firstTaskStart))
      .reduce((prev, curr) => prev + curr, 0);

    this.time = millisToHourFormat(millisWorked);
  }

  // Resolves state of day tasks.
  private resolveState(): void {
    // No tasks.
    if (!this.tasks.length) {
      this.state = 'none';
      return;
    }

    // At least one of tasks is rejected.
    if (this.tasks.find(item => item.isRejected)) {
      this.state = 'rejected';
      return;
    }

    // All tasks approved.
    if (this.tasks.filter(item => item.isApproved).length === this.tasks.length) {
      this.state = 'approved';
      return;
    }

    this.state = 'mixed';
  }

}
