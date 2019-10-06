/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';
import { TransformationHelperService } from './transformation-helper.service';

describe('Service: TransformationHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransformationHelperService]
    });
  });

  it('should ...', inject(
    [TransformationHelperService],
    (service: TransformationHelperService) => {
      expect(service).toBeTruthy();
    }
  ));
});
