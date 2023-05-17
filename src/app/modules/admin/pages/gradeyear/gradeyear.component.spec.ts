import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeyearComponent } from './gradeyear.component';

describe('GradeyearComponent', () => {
  let component: GradeyearComponent;
  let fixture: ComponentFixture<GradeyearComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradeyearComponent]
    });
    fixture = TestBed.createComponent(GradeyearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
