// src/app/core/services/metrics.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MetricsService {

  constructor(private http: HttpClient) {}

  sendHttpRequestMetric(method: string, route: string, duration: number) {
    const metrics = `
# TYPE angular_http_request_duration_seconds gauge
angular_http_request_duration_seconds{method="${method}",route="${route}"} ${duration}
`;
    fetch("http://pushgateway:9091/metrics/job/angular_app", {
      method: "POST",
      headers: {
        "Content-Type": "text/plain"
      },
      body: metrics
    });
  }
}

