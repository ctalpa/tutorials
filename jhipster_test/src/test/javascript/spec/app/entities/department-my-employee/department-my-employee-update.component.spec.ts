import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterTestTestModule } from '../../../test.module';
import { DepartmentMyEmployeeUpdateComponent } from 'app/entities/department-my-employee/department-my-employee-update.component';
import { DepartmentMyEmployeeService } from 'app/entities/department-my-employee/department-my-employee.service';
import { DepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';

describe('Component Tests', () => {
  describe('DepartmentMyEmployee Management Update Component', () => {
    let comp: DepartmentMyEmployeeUpdateComponent;
    let fixture: ComponentFixture<DepartmentMyEmployeeUpdateComponent>;
    let service: DepartmentMyEmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [DepartmentMyEmployeeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(DepartmentMyEmployeeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DepartmentMyEmployeeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentMyEmployeeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new DepartmentMyEmployee(123);
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
        const entity = new DepartmentMyEmployee();
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
