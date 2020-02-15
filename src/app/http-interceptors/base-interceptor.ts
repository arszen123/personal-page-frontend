import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable} from 'rxjs';

/** Pass untouched request through to the next request handler. */
@Injectable()
export class BaseInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {
    const cloned = req.clone({
      headers: req.headers.set('Content-Type', 'application/json')
    });
    return next.handle(cloned);
  }
}
