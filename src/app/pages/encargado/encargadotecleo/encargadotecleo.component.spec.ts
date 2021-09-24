import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadotecleoComponent } from './encargadotecleo.component';

describe('EncargadotecleoComponent', () => {
  let component: EncargadotecleoComponent;
  let fixture: ComponentFixture<EncargadotecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncargadotecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncargadotecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
