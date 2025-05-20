import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LawDashboardPage } from './law-dashboard.page';

describe('LawDashboardPage', () => {
  let component: LawDashboardPage;
  let fixture: ComponentFixture<LawDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LawDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
