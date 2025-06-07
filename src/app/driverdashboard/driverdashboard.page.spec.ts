import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverdashboardPage } from './driverdashboard.page';

describe('DriverdashboardPage', () => {
  let component: DriverdashboardPage;
  let fixture: ComponentFixture<DriverdashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverdashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
