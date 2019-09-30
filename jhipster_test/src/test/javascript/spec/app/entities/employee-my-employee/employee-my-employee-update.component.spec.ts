import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterTestTestModule } from '../../../test.module';
import { EmployeeMyEmployeeUpdateComponent } from 'app/entities/employee-my-employee/employee-my-employee-update.component';
import { EmployeeMyEmployeeService } from 'app/entities/employee-my-employee/employee-my-employee.service';
import { EmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';

describe('Component Tests', () => {
  describe('EmployeeMyEmployee Management Update Component', () => {
    let comp: EmployeeMyEmployeeUpdateComponent;
    let fixture: ComponentFixture<EmployeeMyEmployeeUpdateComponent>;
    let service: EmployeeMyEmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [EmployeeMyEmployeeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EmployeeMyEmployeeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EmployeeMyEmployeeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeMyEmployeeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeMyEmployee(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new EmployeeMyEmployee();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
