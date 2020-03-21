import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-task',
  template: `
    <div class="row">
      <div class="col">
        <h1 class="mb-5">Dummy Page</h1>
        <a routerLink="/" class="btn btn-block btn-orange text-uppercase text-white">Go Back</a>
      </div>
    </div>
  `,
})
export class AddTaskComponent implements OnInit {
  constructor(private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Add Task');
  }
}
