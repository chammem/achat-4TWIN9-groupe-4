import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponent } from './products/products.component';
import { NgbModal, NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { StockComponent } from './stock/stock.component';
import { ReglementComponent } from './reglement/reglement.component';
import { SecteurActiviteComponent } from './secteur-activite/secteur-activite.component';
import { OperateurComponent } from './operateur/operateur.component';
import { FactureComponent } from './facture/facture.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';  // Importer ngx-logger
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetricsComponent } from './metrics/metrics.component';
import { MetricsResolver } from './metrics.resolver';
import { MetricsService } from './services/metrics.service';
import { MetricsInterceptor } from './metrics.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    StockComponent,
    ReglementComponent,
    SecteurActiviteComponent,
    OperateurComponent,
    FactureComponent,
    NavbarComponent,
    MetricsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModalModule,
    RouterModule,
    NgbModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,  // Niveau de log minimum
      serverLogLevel: NgxLoggerLevel.ERROR, // Niveau pour les logs envoyés au serveur
      disableConsoleLogging: false // S'assurer que les logs ne sont pas désactivés
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ { provide: HTTP_INTERCEPTORS,
    useClass: MetricsInterceptor,
    multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
