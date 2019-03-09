import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistioryEventsComponent } from './history-events.component';

describe('HistioryEventsComponent', () => {
  let component: HistioryEventsComponent;
  let fixture: ComponentFixture<HistioryEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistioryEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistioryEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
