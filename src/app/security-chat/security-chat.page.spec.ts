import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SecurityChatPage } from './security-chat.page';

describe('SecurityChatPage', () => {
  let component: SecurityChatPage;
  let fixture: ComponentFixture<SecurityChatPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityChatPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
