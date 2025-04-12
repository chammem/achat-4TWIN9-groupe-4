import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  readonly API_URL = 'http://localhost:8089/SpringMVC/facture';

  constructor(private httpClient: HttpClient, private logger: NGXLogger) { }

  getAllFactures() {
    this.logger.debug('Fetching all factures from backend');
    this.logger.error('🔥 testing error log')
    return this.httpClient.get(`${this.API_URL}/retrieve-all-factures`);
  }

  addFacture(facture: any) {
    this.logger.info('Adding a new facture:', facture);
    this.logger.error('🔥 testing error log')
    return this.httpClient.post(`${this.API_URL}/add-facture`, facture);
  }
}
