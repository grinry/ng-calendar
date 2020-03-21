import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule), pathMatch: 'full'},
  {path: 'add-task', loadChildren: () => import('./add-task/add-task.module').then(m => m.AddTaskModule), pathMatch: 'full'},
  {path: '**', loadChildren: () => import('./error-404/error-404.module').then(m => m.Error404Module)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
