import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HeadNoopInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.info(`${new Date().toUTCString()}: Strarting Http interceptor chain.`);
    console.info(`${new Date().toUTCString()}: Do bussiness logic before request gets executed.`);
    return next.handle(req)
    .subscribe(event =>{
      console.info(`${new Date().toUTCString()}: Wrapping up Http interceptor chain.`);
      console.info(`${new Date().toUTCString()}: Do bussiness logic after request has got executed.`);
      return of(event)
    });
    //.map((event: HttpEvent<any>) => {
      //if (event instanceof HttpResponse) {
        // do stuff with response and headers you want
        //event.headers
        //event.body
      //}
      //return event;
    //})
  }
}
