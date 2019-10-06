import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTypePanelComponent } from './schema-type-panel.component';

describe('SchemaTypePanelComponent', () => {
  let component: SchemaTypePanelComponent;
  let fixture: ComponentFixture<SchemaTypePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaTypePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaTypePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
