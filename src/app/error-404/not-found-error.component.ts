import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-not-found-error',
  template: `
    <div class="row">
      <div class="col">
        <h1 class="mb-5">404 Not Found</h1>
        <a routerLink="/" class="btn btn-block btn-orange text-uppercase text-white">Go Back</a>
      </div>
    </div>
  `,
})
export class NotFoundErrorComponent implements OnInit {

  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('404 Not Found');
  }

}
