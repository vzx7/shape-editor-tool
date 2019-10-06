import { TestBed } from '@angular/core/testing';

import { PavilionService } from './pavilion.service';

describe('PavilionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PavilionService = TestBed.get(PavilionService);
    expect(service).toBeTruthy();
  });
});
