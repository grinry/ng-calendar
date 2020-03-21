import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from './services/calendar.service';
import { Subscription } from 'rxjs';
import { DayModel } from './models/day.model';

@Component({
  selector: 'app-calendar',
  template: `
    <div class="card shadow bg-white">
      <app-calendar-header class="card-header bg-white" [days]="days"></app-calendar-header>
      <app-calendar-body class="card-body"></app-calendar-body>
      <app-calendar-footer class="card-footer"></app-calendar-footer>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit, OnDestroy {
  public days: Array<DayModel> = [];
  private subs = new Subscription();

  constructor(private calendar: CalendarService) {
  }

  ngOnInit() {
    this.addSubscribers();
    this.days = this.calendar.initCalendarDays(7);
  }

  private addSubscribers(): void {
    this.subs.add();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
