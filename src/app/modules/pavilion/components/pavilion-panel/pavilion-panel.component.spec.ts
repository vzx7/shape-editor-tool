import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavilionPanelComponent } from './pavilion-panel.component';

describe('PavilionPanelComponent', () => {
  let component: PavilionPanelComponent;
  let fixture: ComponentFixture<PavilionPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavilionPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavilionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
