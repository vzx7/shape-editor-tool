import { TestBed } from '@angular/core/testing';

import { ToolActivateService } from './tool-activate.service';

describe('ToolActivateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolActivateService = TestBed.get(ToolActivateService);
    expect(service).toBeTruthy();
  });
});
