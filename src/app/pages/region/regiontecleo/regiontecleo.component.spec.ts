import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegiontecleoComponent } from './regiontecleo.component';

describe('RegiontecleoComponent', () => {
  let component: RegiontecleoComponent;
  let fixture: ComponentFixture<RegiontecleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegiontecleoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegiontecleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
