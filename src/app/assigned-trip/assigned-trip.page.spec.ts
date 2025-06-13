import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AssignedTripPage } from './assigned-trip.page';

describe('AssignedTripPage', () => {
  let component: AssignedTripPage;
  let fixture: ComponentFixture<AssignedTripPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
