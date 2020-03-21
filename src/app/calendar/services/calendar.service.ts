import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { DayModel } from '../models/day.model';

@Injectable()
export class CalendarService {

  private selectedDayIndex = 0;
  private days: Array<DayModel> = [];

  private readonly daySelected = new BehaviorSubject<number>(this.selectedDayIndex);
  private readonly daySelected$ = this.daySelected.asObservable();

  /**
   * Creates array of dates which be used as our calendar.
   * @param dayNumber number
   */
  public initCalendarDays(dayNumber: number = 7): Array<DayModel> {
    const start = moment().startOf('day').add(1, 'day');
    this.days = [...new Array<Date>(dayNumber)]
      .map((_, index) => {
        const date = start.subtract(1, 'day');
        return {index, date: date.toDate(), weekday: date.weekday()};
      });
    return this.days;
  }

  /**
   * Changes current selected day.
   * @param index number
   */
  public selectDay(index: number): void {
    this.selectedDayIndex = index;
    this.daySelected.next(this.selectedDayIndex);
  }

  /**
   * Return index date selected.
   */
  public getSelectedDayIndex(): number {
    return this.selectedDayIndex;
  }

  /**
   * Return selected day.
   */
  public getSelectedDay(): DayModel {
    return this.days[this.selectedDayIndex];
  }

  /**
   * Observable to send dates.
   */
  public onDaySelected() {
    return this.daySelected$;
  }

}
