import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSectionComponent } from './provider-section.component';

describe('ProviderSectionComponent', () => {
  let component: ProviderSectionComponent;
  let fixture: ComponentFixture<ProviderSectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProviderSectionComponent]
    });
    fixture = TestBed.createComponent(ProviderSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
