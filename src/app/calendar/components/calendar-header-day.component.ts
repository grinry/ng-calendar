import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CalendarService } from '../services/calendar.service';
import { DayModel } from '../models/day.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-calendar-header-day',
  template: `
    <button class="btn btn-block"
            [class.text-muted]="isWeekend"
            (click)="select(day)">
      <div>{{ date | date: 'E' }}</div>
      <div class="font-weight-bold"
           [ngClass]="{ 'border border-orange': isToday, 'btn-orange text-white': isSelected }">
        {{ date | date: 'dd' }}
      </div>
      <app-calendar-header-day-time [day]="day"></app-calendar-header-day-time>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderDayComponent implements OnInit, OnDestroy, OnChanges {
  @Input() day: DayModel;

  public date: Date;
  public isToday: boolean;
  public isSelected: boolean;
  public isWeekend: boolean;

  private subs = new Subscription();

  constructor(private calendar: CalendarService, private ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.subs.add(
      this.calendar.onDaySelected().subscribe(this.handleSelectedDay.bind(this)),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    const day = changes.day;
    if (day.currentValue !== day.previousValue) {
      this.handleDayChanges();
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public select(day: DayModel): void {
    this.calendar.selectDay(day.index);
  }

  private handleDayChanges(): void {
    this.date = this.day.date;
    this.isWeekend = [0, 6].includes(this.day.weekday); // 0 - sunday, 6 - saturday.
    this.isToday = this.day.index === 0; // Today is first item in our index.
  }

  /**
   * Rerenders view only if selected day is truly changed.
   */
  private handleSelectedDay(): void {
    const value: boolean = this.calendar.getSelectedDayIndex() === this.day.index;
    if (value !== this.isSelected) {
      this.isSelected = value;
      this.ref.markForCheck();
    }
  }

}
