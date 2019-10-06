import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectModalComponent } from './multi-select-modal.component';

describe('MultiSelectModalComponent', () => {
  let component: MultiSelectModalComponent;
  let fixture: ComponentFixture<MultiSelectModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultiSelectModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultiSelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
