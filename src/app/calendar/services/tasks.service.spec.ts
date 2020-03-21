import { TestBed } from '@angular/core/testing';
import { TasksService } from './tasks.service';
import { HttpClientModule } from '@angular/common/http';
import { fakeBackendProvider } from '../interceptors/fake-backend.interceptor';
import { mockedTasks } from '../__mocks__/tasks.mock';

describe('TasksService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [TasksService, fakeBackendProvider],
  }));

  it('should be created', () => {
    const service: TasksService = TestBed.get(TasksService);
    expect(service).toBeTruthy();
  });

  it('should be able to load mocked data', (done: DoneFn) => {
    const service: TasksService = TestBed.get(TasksService);
    service.get().subscribe(data => {
      expect(data).toEqual(mockedTasks);
      expect(service.tasks().length).toBe(mockedTasks.length);
      done();
    });
  });
});
