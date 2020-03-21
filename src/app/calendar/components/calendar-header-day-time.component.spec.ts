import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CalendarHeaderDayTimeComponent } from './calendar-header-day-time.component';
import { TasksService } from '../services/tasks.service';

describe('CalendarHeaderDayTimeComponent', () => {
  let component: CalendarHeaderDayTimeComponent;
  let fixture: ComponentFixture<CalendarHeaderDayTimeComponent>;

  const date = new Date();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarHeaderDayTimeComponent,
      ],
      imports: [
        CommonModule,
        HttpClientModule,
      ],
      providers: [
        TasksService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarHeaderDayTimeComponent);
    component = fixture.debugElement.componentInstance;
    component.day = {index: 0, date, weekday: 0};
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show "-" when there is no logged time', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('time').textContent).toContain('-');
  });

});
