import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HttpClientModule } from "@angular/common/http";
import { ProductsComponent } from "./products/products.component";
import {
  NgbModal,
  NgbModalModule,
  NgbModule,
} from "@ng-bootstrap/ng-bootstrap";
import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { StockComponent } from "./stock/stock.component";
import { ReglementComponent } from "./reglement/reglement.component";
import { SecteurActiviteComponent } from "./secteur-activite/secteur-activite.component";
import { OperateurComponent } from "./operateur/operateur.component";
import { FactureComponent } from "./facture/facture.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';// Importer ngx-logger
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
      level: NgxLoggerLevel.DEBUG, // this controls browser logging
      serverLogLevel: NgxLoggerLevel.INFO, // this controls sending logs to server
      serverLoggingUrl: 'http://localhost:8089/SpringMVC/logs' // important
    }),
    
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
