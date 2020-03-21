import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarHeaderTitleComponent } from './calendar-header-title.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CalendarService } from '../services/calendar.service';
import * as moment from 'moment';

describe('CalendarHeaderTitleComponent', () => {
  let component: CalendarHeaderTitleComponent;
  let fixture: ComponentFixture<CalendarHeaderTitleComponent>;

  const date = new Date();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarHeaderTitleComponent,
      ],
      imports: [
        CommonModule,
        HttpClientModule,
      ],
      providers: [
        CalendarService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHeaderTitleComponent);
    component = fixture.debugElement.componentInstance;
    component.day = {index: 0, date, weekday: 0};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title with given date', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.card-title').textContent).toContain(moment(date).format('MMMM YYYY'));
  });

});
