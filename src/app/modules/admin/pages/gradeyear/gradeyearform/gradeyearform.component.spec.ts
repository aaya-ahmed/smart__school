import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeyearformComponent } from './gradeyearform.component';

describe('GradeyearformComponent', () => {
  let component: GradeyearformComponent;
  let fixture: ComponentFixture<GradeyearformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GradeyearformComponent]
    });
    fixture = TestBed.createComponent(GradeyearformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
