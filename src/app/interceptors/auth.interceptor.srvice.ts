import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { finalize, Observable, pipe } from 'rxjs';
import { ServiceService } from '../spinner.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private _spinnerServ: ServiceService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    this._spinnerServ.spinnerSub$.next(true);
    const reqQlone = request.clone({
      setHeaders: {
        auth: 'Beares token add ...',
      },
    });
    return next
      .handle(reqQlone)
      .pipe(finalize(() => this._spinnerServ.spinnerSub$.next(false)));
  }
}
