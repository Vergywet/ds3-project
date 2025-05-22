import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LiveFeedsPage } from './live-feeds.page';

describe('LiveFeedsPage', () => {
  let component: LiveFeedsPage;
  let fixture: ComponentFixture<LiveFeedsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveFeedsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
