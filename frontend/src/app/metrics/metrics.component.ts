import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.css']
})


export class MetricsComponent implements OnInit {
  metricsData!: string;

  constructor(private readonly route: ActivatedRoute) {}

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.metricsData = data.metricsData;
    });
  }
}
