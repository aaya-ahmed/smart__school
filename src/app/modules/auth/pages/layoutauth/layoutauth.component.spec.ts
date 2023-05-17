import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutauthComponent } from './layoutauth.component';

describe('LayoutauthComponent', () => {
  let component: LayoutauthComponent;
  let fixture: ComponentFixture<LayoutauthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutauthComponent]
    });
    fixture = TestBed.createComponent(LayoutauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
