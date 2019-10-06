import { TestBed } from '@angular/core/testing';

import { UtilitesService } from './utilites.service';

describe('ToolsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UtilitesService = TestBed.get(UtilitesService);
    expect(service).toBeTruthy();
  });
});
