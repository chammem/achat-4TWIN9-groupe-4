// src/app/core/interceptors/metrics.interceptor.ts
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { MetricsService } from '../services/metrics.service';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MetricsInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const start = performance.now();
    return next.handle(req).pipe(
      tap({
        next: () => {
          const duration = performance.now() - start;
          console.log(`[Metrics] ${req.method} ${req.url} - ${duration.toFixed(2)}ms`);

          // TODO: Envoyer les métriques à metrics-server.js via fetch ou HttpClient
          fetch('http://metrics-server:9091/metrics', { method: 'GET' });
        }
      })
    );
  }
}
