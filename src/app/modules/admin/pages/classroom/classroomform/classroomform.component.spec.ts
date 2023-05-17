import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassroomformComponent } from './classroomform.component';

describe('ClassroomformComponent', () => {
  let component: ClassroomformComponent;
  let fixture: ComponentFixture<ClassroomformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClassroomformComponent]
    });
    fixture = TestBed.createComponent(ClassroomformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
