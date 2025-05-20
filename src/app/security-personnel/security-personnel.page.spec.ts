import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityPersonnelPage } from './security-personnel.page';

describe('SecurityPersonnelPage', () => {
  let component: SecurityPersonnelPage;
  let fixture: ComponentFixture<SecurityPersonnelPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityPersonnelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
