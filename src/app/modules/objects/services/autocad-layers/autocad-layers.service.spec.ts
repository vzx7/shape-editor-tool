import { TestBed } from '@angular/core/testing';

import { AutocadLayersService } from './autocad-layers.service';

describe('AutocadLayersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AutocadLayersService = TestBed.get(AutocadLayersService);
    expect(service).toBeTruthy();
  });
});
