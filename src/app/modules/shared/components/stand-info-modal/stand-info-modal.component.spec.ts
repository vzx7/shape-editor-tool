import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandInfoModalComponent } from './stand-info-modal.component';

describe('StandInfoModalComponent', () => {
  let component: StandInfoModalComponent;
  let fixture: ComponentFixture<StandInfoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandInfoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
