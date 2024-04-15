import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalNewEmpleadoComponent } from './modal-new-empleado.component';

describe('ModalNewEmpleadoComponent', () => {
  let component: ModalNewEmpleadoComponent;
  let fixture: ComponentFixture<ModalNewEmpleadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalNewEmpleadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalNewEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
