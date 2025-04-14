import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class MetricsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const start = performance.now();

    return next.handle(req).pipe(
      tap({
        next: () => {
          const duration = performance.now() - start;
          const metric = {
            method: req.method,
            url: req.url,
            duration: duration.toFixed(2)
          };
          console.log('[METRICS]', metric);

          // Envoi vers metrics-server
          fetch('http://metrics-server:9091/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(metric)
          }).catch(err => console.error('METRICS POST ERROR:', err));
        }
      })
    );
  }
}
