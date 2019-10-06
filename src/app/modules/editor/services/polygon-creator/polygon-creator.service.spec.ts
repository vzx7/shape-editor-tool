import { TestBed } from '@angular/core/testing';

import { PolygonCreatorService } from './polygon-creator.service';

describe('PolygonCreatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PolygonCreatorService = TestBed.get(PolygonCreatorService);
    expect(service).toBeTruthy();
  });
});
