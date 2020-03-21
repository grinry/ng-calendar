import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '../models/task.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { dateToDayFormat } from '../../../utils/date.helpers';

@Injectable()
export class TasksService {

  // tslint:disable-next-line:variable-name
  private _tasks: Array<TaskModel> = [];

  private readonly tasksUpdated = new BehaviorSubject<Array<TaskModel>>(this._tasks);
  private readonly tasksUpdated$ = this.tasksUpdated.asObservable();

  constructor(private http: HttpClient) {
  }

  /**
   * Get tasks from the backend.
   */
  public get() {
    return this.http.get<Array<TaskModel>>(`/tasks`)
      .pipe(tap(items => this.setTasks(items)));
  }

  /**
   * Get tasks that was already loaded.
   */
  public tasks() {
    return this._tasks;
  }

  /**
   * Returns only tasks for specified date day.
   * @param date Date
   */
  public tasksForDay(date: Date) {
    const day = dateToDayFormat(date);
    return this._tasks.filter(item => dateToDayFormat(item.date) === day);
  }

  public onTasksUpdated() {
    return this.tasksUpdated$;
  }

  private setTasks(tasks: Array<TaskModel>): void {
    this._tasks = tasks;
    this.tasksUpdated.next(this._tasks);
  }
}
