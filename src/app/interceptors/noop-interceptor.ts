import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map, tap, finalize } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class NoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`${new Date().toUTCString()}: Starting No-op interceptor.`);

    const started = Date.now();
    let ok: string;

    return next.handle(req)
    .pipe(
      tap(
        (event) => {
          ok = '';
          if (event instanceof HttpResponse) {
            ok = 'succeeded';
            console.log(`${new Date().toUTCString()}: Response handled by No-op interceptor.`);
          }
        },
        (error) => {
          ok = 'failed';
          console.log(`${new Date().toUTCString()}: Response handled by No-op interceptor.`);
        }
      ),
      finalize(() => {
        const elapsed = Date.now() - started;
        const msg = `${req.method} "${req.urlWithParams}" ${ok} in ${elapsed} ms.`;
        console.log(`${new Date().toUTCString()}: ${msg}`);
        console.log(`${new Date().toUTCString()}: Wrapping up No-op interceptor.`);
      })
    );
  }
}
