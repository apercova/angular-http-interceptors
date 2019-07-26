import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpsInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // clone request and replace 'http://' with 'https://' at the same time
    let replaceUrl = req.url
    .replace('http://', 'https://')
    .replace('sftp://', 'https://')
    .replace('ftp://', 'https://');

    const secureReq = req.clone({
      url: replaceUrl
    });
    // send the cloned, "secure" request to the next handler.
    return next.handle(secureReq);
  }
}
