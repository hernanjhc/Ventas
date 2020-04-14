import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaUnidadComponent } from './nueva-unidad.component';

describe('NuevaUnidadComponent', () => {
  let component: NuevaUnidadComponent;
  let fixture: ComponentFixture<NuevaUnidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaUnidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
