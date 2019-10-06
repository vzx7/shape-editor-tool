import { TestBed } from '@angular/core/testing';

import { EditorStateService } from './editor-state.service';

describe('EditorStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorStateService = TestBed.get(EditorStateService);
    expect(service).toBeTruthy();
  });
});
