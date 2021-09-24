import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartamentotecleoComponent } from './departamentotecleo.component';

describe('DepartamentotecleoComponent', () => {
  let component: DepartamentotecleoComponent;
  let fixture: ComponentFixture<DepartamentotecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepartamentotecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartamentotecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
