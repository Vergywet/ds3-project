import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LawCommsPage } from './law-comms.page';

describe('LawCommsPage', () => {
  let component: LawCommsPage;
  let fixture: ComponentFixture<LawCommsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LawCommsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
