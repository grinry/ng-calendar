import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-footer',
  template: `
    <a class="btn btn-block btn-orange text-uppercase text-white" routerLink="/add-task">Add task</a>
  `,
})
export class CalendarFooterComponent {
}
