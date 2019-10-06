import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCadLayerModalComponent } from './auto-cad-layer-modal.component';

describe('AutoCadLayerModalComponent', () => {
  let component: AutoCadLayerModalComponent;
  let fixture: ComponentFixture<AutoCadLayerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCadLayerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCadLayerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
