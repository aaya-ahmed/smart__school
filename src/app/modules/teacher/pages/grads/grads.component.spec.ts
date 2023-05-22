import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradsComponent } from './grads.component';

describe('GradsComponent', () => {
  let component: GradsComponent;
  let fixture: ComponentFixture<GradsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradsComponent]
    });
    fixture = TestBed.createComponent(GradsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
