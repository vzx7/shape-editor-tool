/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';
import { ObjectsHostService } from './objects-host.service';

describe('Service: ObjectsHost', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObjectsHostService]
    });
  });

  it('should ...', inject(
    [ObjectsHostService],
    (service: ObjectsHostService) => {
      expect(service).toBeTruthy();
    }
  ));
});
