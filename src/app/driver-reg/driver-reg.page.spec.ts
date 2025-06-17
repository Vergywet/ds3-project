import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DriverRegPage } from './driver-reg.page';

describe('DriverRegPage', () => {
  let component: DriverRegPage;
  let fixture: ComponentFixture<DriverRegPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
