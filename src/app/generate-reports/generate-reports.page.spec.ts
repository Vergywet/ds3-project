import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GenerateReportsPage } from './generate-reports.page';

describe('GenerateReportsPage', () => {
  let component: GenerateReportsPage;
  let fixture: ComponentFixture<GenerateReportsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateReportsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GenerateReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invalidate filters if dates are missing', () => {
    component.filters.startDate = '';
    component.filters.endDate = '';
    expect(component['validateFilters']()).toBeFalse();
  });

  it('should validate filters if dates are present', () => {
    component.filters.startDate = '2025-04-01';
    component.filters.endDate = '2025-04-20';
    expect(component['validateFilters']()).toBeTrue();
  });
});
