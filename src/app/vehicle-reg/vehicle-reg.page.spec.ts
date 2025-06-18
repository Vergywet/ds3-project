import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehicleRegPage } from './vehicle-reg.page';

describe('VehicleRegPage', () => {
  let component: VehicleRegPage;
  let fixture: ComponentFixture<VehicleRegPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
