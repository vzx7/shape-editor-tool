import { TestBed } from '@angular/core/testing';

import { PainterHelperService } from './painter-helper.service';

describe('PainterHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PainterHelperService = TestBed.get(PainterHelperService);
    expect(service).toBeTruthy();
  });
});
