import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadzComponent } from './uploadz.component';

describe('UploadzComponent', () => {
  let component: UploadzComponent;
  let fixture: ComponentFixture<UploadzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
