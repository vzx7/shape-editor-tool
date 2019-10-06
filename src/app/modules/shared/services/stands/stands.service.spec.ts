import { TestBed } from '@angular/core/testing';

import { StandsService } from './stands.service';

describe('StandsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandsService = TestBed.get(StandsService);
    expect(service).toBeTruthy();
  });
});
