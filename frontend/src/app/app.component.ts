import { Component } from '@angular/core';
<<<<<<< HEAD
=======
import { MetricsService } from './services/metrics.service';
import { environment } from '../environments/environment.prod';
>>>>>>> df2a6f5967fa7af69cab542e13d3a28c60b52643

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
<<<<<<< HEAD
  title = 'crudtuto-Front';
=======
  constructor(private metrics: MetricsService) {
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
>>>>>>> df2a6f5967fa7af69cab542e13d3a28c60b52643
}
