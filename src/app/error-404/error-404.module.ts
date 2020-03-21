import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Error404RoutingModule } from './error-404-routing.module';
import { NotFoundErrorComponent } from './not-found-error.component';

@NgModule({
  declarations: [NotFoundErrorComponent],
  imports: [
    CommonModule,
    Error404RoutingModule,
  ],
})
export class Error404Module {
}
