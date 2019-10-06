import { TestBed } from '@angular/core/testing';

import { SvgNativeHelperService } from './svg-native-helper.service';

describe('SvgNativeHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SvgNativeHelperService = TestBed.get(SvgNativeHelperService);
    expect(service).toBeTruthy();
  });
});
