import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient} from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecteurActivite } from '../Model/Secteur-activite'; // Make sure to import your model
>>>>>>> df2a6f5967fa7af69cab542e13d3a28c60b52643

@Injectable({
  providedIn: 'root'
})
export class SecteurActiviteService {
  readonly API_URL = 'http://localhost:8089/SpringMVC/secteurActivite';

<<<<<<< HEAD
  constructor(private httpClient: HttpClient) { }

  getAllSecteurActivites() {
    return this.httpClient.get(`${this.API_URL}/retrieve-all-secteurActivite`)
  }
  addSecteurActivite(secteurActivite : any) {
    return this.httpClient.post(`${this.API_URL}/add-secteurActivite`, secteurActivite)
  }
  editSecteurActivite(secteurActivite : any){
    return this.httpClient.put(`${this.API_URL}/modify-secteurActivite`, secteurActivite)
  }
  deleteSecteurActivite(idSecteurActivite : any){
    return  this.httpClient.delete(`${this.API_URL}/remove-secteurActivite/${idSecteurActivite}`)
=======
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
>>>>>>> df2a6f5967fa7af69cab542e13d3a28c60b52643
  }
}
