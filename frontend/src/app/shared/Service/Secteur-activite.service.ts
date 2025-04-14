import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecteurActivite } from '../Model/Secteur-activite'; // Make sure to import your model

@Injectable({
  providedIn: 'root'
})
export class SecteurActiviteService {
  readonly API_URL = 'http://localhost:8089/SpringMVC/secteurActivite';

  constructor(private httpClient: HttpClient) {}

  // Get all secteur activites
  getAllSecteurActivites(): Observable<SecteurActivite[]> {
    return this.httpClient.get<SecteurActivite[]>(`${this.API_URL}/retrieve-all-secteurActivite`);
  }

  // Add a new secteur activite
  addSecteurActivite(secteurActivite: SecteurActivite): Observable<SecteurActivite> {
    return this.httpClient.post<SecteurActivite>(`${this.API_URL}/add-secteurActivite`, secteurActivite);
  }

  // Edit an existing secteur activite
  editSecteurActivite(secteurActivite: SecteurActivite): Observable<SecteurActivite> {
    return this.httpClient.put<SecteurActivite>(`${this.API_URL}/modify-secteurActivite`, secteurActivite);
  }

  // Delete a secteur activite by ID
  deleteSecteurActivite(idSecteurActivite: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/remove-secteurActivite/${idSecteurActivite}`);
  }
}
