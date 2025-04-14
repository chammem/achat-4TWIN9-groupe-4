import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs'; // Pour simuler les observables
import { MetricsComponent } from './metrics.component';
import { TestBed } from '@angular/core/testing';

describe('MetricsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MetricsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // ou paramMap: of(...) selon ton code
            snapshot: {
              paramMap: {
                get: () => null // simule l'accès à route.snapshot.paramMap.get('id') par exemple
              }
            }
          }
        }
      ]
    }).compileComponents();
  });
  // ...
});
