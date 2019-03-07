import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaningPageComponent } from './planing-page.component';

describe('PlaningPageComponent', () => {
  let component: PlaningPageComponent;
  let fixture: ComponentFixture<PlaningPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaningPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaningPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
