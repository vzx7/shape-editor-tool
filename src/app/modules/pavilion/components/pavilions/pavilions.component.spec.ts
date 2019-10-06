import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PavilionsComponent } from './pavilions.component';

describe('PavilionsComponent', () => {
  let component: PavilionsComponent;
  let fixture: ComponentFixture<PavilionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PavilionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PavilionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
