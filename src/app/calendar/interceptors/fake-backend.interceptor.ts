import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { mockedTasks } from '../__mocks__/tasks.mock';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const {url, method, headers, body} = request;

    // wrap in delayed observable to simulate server api call
    return of(null)
      .pipe(mergeMap(handleRoute))
      .pipe(materialize())
      .pipe(delay(500))
      .pipe(dematerialize());

    // decide which mocked data to serve
    function handleRoute() {
      switch (true) {
        case url.endsWith('/tasks') && method === 'GET':
          return getTasks();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // mocked resources
    function getTasks() {
      return ok(mockedTasks);
    }

    // helper functions
    function ok(data?: any) {
      return of(new HttpResponse({status: 200, body: data}));
    }

    function error(message) {
      return throwError({error: {message}});
    }

  }
}

export const fakeBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
