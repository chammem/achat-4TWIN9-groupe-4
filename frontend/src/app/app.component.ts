import { Component } from '@angular/core';
import { MetricsService } from './services/metrics.service';
import { environment } from '../environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private readonly metrics: MetricsService) {
  // Exemple : incrémenter les vues de page
    this.metrics.incrementPageViews();

    // Générer le fichier de métriques (toutes les 15s)
    setInterval(() => this.exportMetrics(), 15000);
  }

  private async exportMetrics() {
    const metrics = await this.metrics.getMetrics();
    fetch(environment.metricsEndpoint, {
      method: 'POST',
      body: metrics
    });
  }
}
