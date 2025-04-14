// src/app/metrics.resolver.ts
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { MetricsService } from './services/metrics.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MetricsResolver implements Resolve<string> {
  constructor(private metricsService: MetricsService) {}

  resolve(): Observable<string> | Promise<string> | string {
    return this.metricsService.getMetrics();
  }
}