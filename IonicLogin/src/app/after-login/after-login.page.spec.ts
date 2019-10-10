import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterLoginPage } from './after-login.page';

describe('AfterLoginPage', () => {
  let component: AfterLoginPage;
  let fixture: ComponentFixture<AfterLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfterLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfterLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
