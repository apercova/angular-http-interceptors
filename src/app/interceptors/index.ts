/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeadNoopInterceptor } from './head-noop-interceptor';
import { TailNoopInterceptor } from './tail-noop-interceptor';
import { HttpsInterceptor } from './https-interceptor';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HeadNoopInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TailNoopInterceptor, multi: true },
];
