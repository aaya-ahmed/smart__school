import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectformComponent } from './subjectform.component';

describe('SubjectformComponent', () => {
  let component: SubjectformComponent;
  let fixture: ComponentFixture<SubjectformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubjectformComponent]
    });
    fixture = TestBed.createComponent(SubjectformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
