import { TestBed } from '@angular/core/testing';

import { WorkAreaService } from './work-area.service';

describe('WorkAreaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkAreaService = TestBed.get(WorkAreaService);
    expect(service).toBeTruthy();
  });
});
