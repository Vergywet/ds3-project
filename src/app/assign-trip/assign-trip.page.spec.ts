import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignTripPage } from './assign-trip.page';

describe('AssignTripPage', () => {
  let component: AssignTripPage;
  let fixture: ComponentFixture<AssignTripPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
