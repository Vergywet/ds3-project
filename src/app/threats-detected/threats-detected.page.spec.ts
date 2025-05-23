import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThreatsDetectedPage } from './threats-detected.page';

describe('ThreatsDetectedPage', () => {
  let component: ThreatsDetectedPage;
  let fixture: ComponentFixture<ThreatsDetectedPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatsDetectedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
