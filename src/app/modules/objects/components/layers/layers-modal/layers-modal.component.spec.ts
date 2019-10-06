import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersModalComponent } from './layers-modal.component';

describe('LayersModalComponent', () => {
  let component: LayersModalComponent;
  let fixture: ComponentFixture<LayersModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
