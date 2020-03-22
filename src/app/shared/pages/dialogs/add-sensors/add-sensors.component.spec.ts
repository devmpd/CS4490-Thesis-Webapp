import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSensorsComponent } from './add-sensors.component';

describe('AddSensorsComponent', () => {
  let component: AddSensorsComponent;
  let fixture: ComponentFixture<AddSensorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSensorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSensorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
