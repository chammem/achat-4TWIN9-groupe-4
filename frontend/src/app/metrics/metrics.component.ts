import { Component, OnInit } from '@angular/core';
import { MetricsService } from '../services/metrics.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})


export class MetricsComponent implements OnInit {
  metricsData!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.metricsData = data.metricsData;
    });
  }
}
