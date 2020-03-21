import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarComponent } from './calendar.component';
import { CalendarHeaderComponent } from './components/calendar-header.component';
import { CalendarFooterComponent } from './components/calendar-footer.component';
import { CalendarHeaderTitleComponent } from './components/calendar-header-title.component';
import { CalendarHeaderDayComponent } from './components/calendar-header-day.component';
import { CalendarHeaderDayTimeComponent } from './components/calendar-header-day-time.component';
import { CalendarBodyComponent } from './components/calendar-body.component';
import { TaskHoursGroupComponent } from './components/task-hours-group.component';
import { TaskExpensesGroupComponent } from './components/task-expenses-group.component';
import { TaskAdditionalHoursGroupComponent } from './components/task-additional-hours-group.component';
import { TaskGroupComponent } from './components/task-group.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from './interceptors/fake-backend.interceptor';
import { TasksService } from './services/tasks.service';
import { CalendarService } from './services/calendar.service';

describe('CalendarComponent', () => {
  let component: CalendarComponent;
  let fixture: ComponentFixture<CalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CalendarComponent,
        CalendarHeaderComponent,
        CalendarFooterComponent,
        CalendarHeaderTitleComponent,
        CalendarHeaderDayComponent,
        CalendarHeaderDayTimeComponent,
        CalendarBodyComponent,
        TaskHoursGroupComponent,
        TaskExpensesGroupComponent,
        TaskAdditionalHoursGroupComponent,
        TaskGroupComponent,
      ],
      imports: [
        CommonModule,
        HttpClientModule,
      ],
      providers: [
        fakeBackendProvider,
        TasksService,
        CalendarService,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
