import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar.component';
import { fakeBackendProvider } from './interceptors/fake-backend.interceptor';
import { TasksService } from './services/tasks.service';
import { CalendarService } from './services/calendar.service';
import { CalendarHeaderComponent } from './components/calendar-header.component';
import { CalendarFooterComponent } from './components/calendar-footer.component';
import { CalendarHeaderTitleComponent } from './components/calendar-header-title.component';
import { CalendarHeaderDayComponent } from './components/calendar-header-day.component';
import { CalendarHeaderDayTimeComponent } from './components/calendar-header-day-time.component';
import { CalendarBodyComponent } from './components/calendar-body.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskHoursGroupComponent } from './components/task-hours-group.component';
import { TaskExpensesGroupComponent } from './components/task-expenses-group.component';
import { TaskAdditionalHoursGroupComponent } from './components/task-additional-hours-group.component';
import { TaskGroupComponent } from './components/task-group.component';


@NgModule({
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
  exports: [
    CalendarComponent,
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
export class CalendarModule {
}
