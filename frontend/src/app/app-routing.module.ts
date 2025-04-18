import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { StockComponent } from './stock/stock.component';
import { ReglementComponent } from './reglement/reglement.component';
import { SecteurActiviteComponent } from './secteur-activite/secteur-activite.component';
import { OperateurComponent } from './operateur/operateur.component';
import { FactureComponent } from './facture/facture.component';
import { MetricsComponent } from './metrics/metrics.component';
import { MetricsResolver } from './metrics.resolver';


const routes: Routes =[
  { path: 'secteurActivite',  component: SecteurActiviteComponent },
  { path: 'operateur',  component: OperateurComponent },
  { path: 'facture',  component: FactureComponent },
  { path: 'product',  component: ProductsComponent },
  { path: 'stock',  component: StockComponent },
  { path: 'reglement',  component: ReglementComponent },
  { path: '', redirectTo: 'product', pathMatch: 'full'},
  { path: 'metrics',component: MetricsComponent,resolve: {metricsData: MetricsResolver}}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
