import { TestBed } from '@angular/core/testing';

import { RotatorService } from './rotator.service';

describe('RotatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RotatorService = TestBed.get(RotatorService);
    expect(service).toBeTruthy();
  });
});
