import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReceivedReportsPage } from './received-reports.page';

describe('ReceivedReportsPage', () => {
  let component: ReceivedReportsPage;
  let fixture: ComponentFixture<ReceivedReportsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReceivedReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
