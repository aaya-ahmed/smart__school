import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentattandanceComponent } from './studentattandance.component';

describe('StudentattandanceComponent', () => {
  let component: StudentattandanceComponent;
  let fixture: ComponentFixture<StudentattandanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentattandanceComponent]
    });
    fixture = TestBed.createComponent(StudentattandanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
