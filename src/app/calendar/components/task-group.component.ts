import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-group',
  template: `
    <div class="card border-0">
      <div class="card-header border-0 rounded-0">
        <div class="row">
          <div class="col">
            <img *ngIf="icon" [src]="'/assets/icon-' + icon + '.svg'" [alt]="header" class="float-left mr-2"/>
            {{ header }}
          </div>
          <div class="col col-auto">
            <ng-content select="[group-subheader]"></ng-content>
          </div>
        </div>
      </div>
      <div class="card-body">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class TaskGroupComponent {
  @Input() header: string;
  @Input() icon: 'clock' | 'money';
}
