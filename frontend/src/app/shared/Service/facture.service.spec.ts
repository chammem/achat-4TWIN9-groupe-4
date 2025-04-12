import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FactureService } from './Facture.service'; // ✅ Make sure the filename is lowercase
import { NGXLogger } from 'ngx-logger';
import { Facture } from '../Model/Facture'; // ✅ Adjust path if needed

describe('FactureService', () => {
  let service: FactureService;
  let httpMock: HttpTestingController;
  let loggerSpy: jasmine.SpyObj<NGXLogger>;

  beforeEach(() => {
    const loggerMock = jasmine.createSpyObj('NGXLogger', ['debug', 'info', 'error']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        FactureService,
        { provide: NGXLogger, useValue: loggerMock }
      ]
    });

    service = TestBed.inject(FactureService);
    httpMock = TestBed.inject(HttpTestingController);
    loggerSpy = TestBed.inject(NGXLogger) as jasmine.SpyObj<NGXLogger>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should retrieve all factures', () => {
    const dummyFactures: Facture[] = [
      {
        idFacture: 1,
        montantFacture: 100,
        montantRemise: 10,
        dateCreationFacture: new Date(),
        dateDerniereModificationFacture: new Date(),
        archivee: false
      }
    ];

    service.getAllFactures().subscribe((factures: Facture[]) => {
      expect(factures).toEqual(dummyFactures);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/facture/retrieve-all-factures');
    expect(req.request.method).toBe('GET');
    req.flush(dummyFactures);

    expect(loggerSpy.debug).toHaveBeenCalled();
    expect(loggerSpy.error).toHaveBeenCalled();
  });

  it('should add a facture', () => {
    const newFacture: Facture = {
      idFacture: 2,
      montantFacture: 150,
      montantRemise: 5,
      dateCreationFacture: new Date(),
      dateDerniereModificationFacture: new Date(),
      archivee: false
    };

    service.addFacture(newFacture).subscribe((facture: Facture) => {
      expect(facture).toEqual(newFacture);
    });

    const req = httpMock.expectOne('http://localhost:8089/SpringMVC/facture/add-facture');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newFacture);
    req.flush(newFacture);

    expect(loggerSpy.info).toHaveBeenCalled();
    expect(loggerSpy.error).toHaveBeenCalled();
  });
});
