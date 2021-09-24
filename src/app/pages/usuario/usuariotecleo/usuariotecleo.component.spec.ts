import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariotecleoComponent } from './usuariotecleo.component';

describe('UsuariotecleoComponent', () => {
  let component: UsuariotecleoComponent;
  let fixture: ComponentFixture<UsuariotecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuariotecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuariotecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
