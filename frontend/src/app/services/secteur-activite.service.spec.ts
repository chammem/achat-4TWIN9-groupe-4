import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SecteurActiviteService } from '../services/secteur-activite.service';
import { SecteurActivite } from '../shared/Model/Secteur-activite';

describe('SecteurActiviteService', () => {
  let service: SecteurActiviteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SecteurActiviteService]
    });

    service = TestBed.inject(SecteurActiviteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête HTTP n'est restée ouverte
  });

  it('should retrieve all secteur activites', () => {
    const dummySecteurs: SecteurActivite[] = [
      { idSecteurActivite: 1, codeSecteurActivite: '01', libelleSecteurActivite: 'Tech' },
      { idSecteurActivite: 2, codeSecteurActivite: '02', libelleSecteurActivite: 'Finance' }
    ];

    service.getAllSecteurActivites().subscribe((secteurs: SecteurActivite[]) => {
      expect(secteurs.length).toBe(2);
      expect(secteurs).toEqual(dummySecteurs);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/secteurActivite/retrieve-all-secteurActivite');
    expect(req.request.method).toBe('GET');
    req.flush(dummySecteurs);
  });
});
