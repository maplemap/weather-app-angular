import { TestBed, async, inject } from '@angular/core/testing';
import { ResolveLocationService } from './resolve-location.service';

describe('ResolveLocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolveLocationService]
    });
  });

  it('should ...', inject([ResolveLocationService], (service: ResolveLocationService) => {
    expect(service).toBeTruthy();
  }));
});
