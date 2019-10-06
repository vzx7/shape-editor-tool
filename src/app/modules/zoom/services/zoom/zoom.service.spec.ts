import { inject, TestBed } from '@angular/core/testing';
import { ZoomService } from './zoom.service';

describe('Service: Zoom', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ZoomService]
    });
  });

  it('should ...', inject([ZoomService], (service: ZoomService) => {
    expect(service).toBeTruthy();
  }));
});
