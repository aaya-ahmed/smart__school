import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SonComponent } from './son.component';

describe('SonComponent', () => {
  let component: SonComponent;
  let fixture: ComponentFixture<SonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SonComponent]
    });
    fixture = TestBed.createComponent(SonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
