import { TestBed } from '@angular/core/testing';
import { CalendarService } from './calendar.service';
import * as moment from 'moment';

describe('CalendarService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CalendarService],
  }));

  it('should be created', () => {
    const service: CalendarService = TestBed.get(CalendarService);
    expect(service).toBeTruthy();
  });

  it('should create array of day objects', () => {
    const howMany = 3;
    const service: CalendarService = TestBed.get(CalendarService);
    const days = service.initCalendarDays(howMany);
    expect(days.length).toBe(howMany);

    const first = days[0];
    expect(first.index).toBe(0);
    expect(first.date.toISOString()).toBe(moment().startOf('day').toISOString());

    const last = days[howMany - 1];
    expect(last.index).toBe(howMany - 1);
    expect(last.date.toISOString()).toBe(moment().subtract(howMany - 1, 'days').startOf('day').toISOString());
  });

  it('should allow to select another day', () => {
    const service: CalendarService = TestBed.get(CalendarService);
    service.initCalendarDays();

    expect(service.getSelectedDayIndex()).toBe(0);

    service.selectDay(1);

    expect(service.getSelectedDayIndex()).toBe(1);

  });
});
