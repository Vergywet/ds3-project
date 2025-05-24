import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DroneDetectionPage } from './drone-detection.page';

describe('DroneDetectionPage', () => {
  let component: DroneDetectionPage;
  let fixture: ComponentFixture<DroneDetectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneDetectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
