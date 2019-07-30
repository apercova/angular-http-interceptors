import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log(`${new Date().toUTCString()}: Starting HTTPS interceptor.`);
    // clone request and replace 'http://' with 'https://' at the same time
    const replaceUrl = req.url
    .replace('xhttp://', 'https://')
    .replace('ftp://', 'sftp://');

    const secureReq = req.clone({
      url: replaceUrl
    });
    // send the cloned, "secure" request to the next handler.
    return next.handle(secureReq)
    .pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            console.log(`${new Date().toUTCString()}: Response handled by HTTPS interceptor.`);
          }
        },
        (error) => {
          console.log(`${new Date().toUTCString()}: Response handled by HTTPS interceptor.`);
        }
      ),
      finalize(() => {
        console.log(`${new Date().toUTCString()}: Wrapping up HTTPS interceptor.`);
      })
    );
  }
}
