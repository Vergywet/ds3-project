import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripSchedulingPage } from './trip-scheduling.page';

describe('TripSchedulingPage', () => {
  let component: TripSchedulingPage;
  let fixture: ComponentFixture<TripSchedulingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSchedulingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
