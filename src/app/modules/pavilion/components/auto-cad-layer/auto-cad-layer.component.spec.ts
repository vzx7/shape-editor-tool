import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCadLayerComponent } from './auto-cad-layer.component';

describe('AutoCadLayerComponent', () => {
  let component: AutoCadLayerComponent;
  let fixture: ComponentFixture<AutoCadLayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCadLayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCadLayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
