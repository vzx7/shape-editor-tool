import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavilionsModalComponent } from './pavilions-modal.component';

describe('PavilionsModalComponent', () => {
  let component: PavilionsModalComponent;
  let fixture: ComponentFixture<PavilionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavilionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavilionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
