import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComerciotecleoComponent } from './comerciotecleo.component';

describe('ComerciotecleoComponent', () => {
  let component: ComerciotecleoComponent;
  let fixture: ComponentFixture<ComerciotecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComerciotecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComerciotecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
