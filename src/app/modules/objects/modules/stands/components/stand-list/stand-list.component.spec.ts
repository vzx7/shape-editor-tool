import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandListComponent } from './stand-list.component';

describe('StandsComponent', () => {
  let component: StandListComponent;
  let fixture: ComponentFixture<StandListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
