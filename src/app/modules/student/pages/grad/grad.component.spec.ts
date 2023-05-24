import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradComponent } from './grad.component';

describe('GradComponent', () => {
  let component: GradComponent;
  let fixture: ComponentFixture<GradComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradComponent]
    });
    fixture = TestBed.createComponent(GradComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
