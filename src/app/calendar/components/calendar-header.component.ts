import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DayModel } from '../models/day.model';

@Component({
  selector: 'app-calendar-header',
  template: `
    <app-calendar-header-title class="row mb-2" [day]="days[0]"></app-calendar-header-title>
    <div class="row">
      <div class="col d-flex flex-nowrap flex-row justify-content-between">
        <div *ngFor="let day of reversedDays; trackBy: trackByFn">
          <app-calendar-header-day [day]="day"></app-calendar-header-day>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarHeaderComponent implements OnChanges {
  @Input() days: Array<DayModel>;

  public reversedDays: Array<DayModel> = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.days.currentValue !== changes.days.previousValue) {
      // Clone days array to remove reference to original object before reversing data.
      const days: Array<DayModel> = [...changes.days.currentValue];
      this.reversedDays = days.reverse();
    }
  }

  public trackByFn(item: DayModel) {
    return item.index;
  }
}
