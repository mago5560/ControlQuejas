import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MunicipiotecleoComponent } from './municipiotecleo.component';

describe('MunicipiotecleoComponent', () => {
  let component: MunicipiotecleoComponent;
  let fixture: ComponentFixture<MunicipiotecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MunicipiotecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MunicipiotecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
