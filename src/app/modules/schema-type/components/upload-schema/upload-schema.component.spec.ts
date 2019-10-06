import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSchemaComponent } from './upload-schema.component';

describe('UploadSchemaComponent', () => {
  let component: UploadSchemaComponent;
  let fixture: ComponentFixture<UploadSchemaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadSchemaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSchemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
