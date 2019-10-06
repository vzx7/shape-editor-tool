import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportShemaComponent } from './export-shema.component';

describe('ExportShemaComponent', () => {
  let component: ExportShemaComponent;
  let fixture: ComponentFixture<ExportShemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExportShemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportShemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
