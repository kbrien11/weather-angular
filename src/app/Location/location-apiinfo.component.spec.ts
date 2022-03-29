import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationAPIInfoComponent } from './location-apiinfo.component';

describe('LocationAPIInfoComponent', () => {
  let component: LocationAPIInfoComponent;
  let fixture: ComponentFixture<LocationAPIInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocationAPIInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationAPIInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
