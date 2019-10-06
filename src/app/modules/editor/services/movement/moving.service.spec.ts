/* tslint:disable:no-unused-variable */

import { async, inject, TestBed } from '@angular/core/testing';
import { MovementService } from './movement.service';

describe('Service: Moving', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovementService]
    });
  });

  it('should ...', inject([MovementService], (service: MovementService) => {
    expect(service).toBeTruthy();
  }));
});
