import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomedetalleComponent } from './homedetalle.component';

describe('HomedetalleComponent', () => {
  let component: HomedetalleComponent;
  let fixture: ComponentFixture<HomedetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomedetalleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomedetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
