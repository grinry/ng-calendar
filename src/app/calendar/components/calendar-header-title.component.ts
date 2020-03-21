import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { Subscription } from 'rxjs';
import { DayModel } from '../models/day.model';

@Component({
  selector: 'app-calendar-header-title',
  template: `
    <div class="col">
      <h5 class="card-title">{{ day.date | date: 'MMMM yyyy' }}</h5>
    </div>
    <div class="col col-auto">
      <button class="btn" (click)="selectToday($event)">
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
          <path d="M0 0h24v24H0V0z" fill="none"/>
          <path
            d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"/>
          <text x="6" y="19" fill="black" font-size="10">{{ day.date | date: 'dd' }}</text>
        </svg>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderTitleComponent {
  @Input() day: DayModel;

  constructor(private calendar: CalendarService) {
  }

  public selectToday($event: Event): void {
    $event.preventDefault();
    this.calendar.selectDay(this.day.index);
  }
}
