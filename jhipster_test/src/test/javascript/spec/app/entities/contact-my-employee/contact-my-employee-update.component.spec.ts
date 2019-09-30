import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterTestTestModule } from '../../../test.module';
import { ContactMyEmployeeUpdateComponent } from 'app/entities/contact-my-employee/contact-my-employee-update.component';
import { ContactMyEmployeeService } from 'app/entities/contact-my-employee/contact-my-employee.service';
import { ContactMyEmployee } from 'app/shared/model/contact-my-employee.model';

describe('Component Tests', () => {
  describe('ContactMyEmployee Management Update Component', () => {
    let comp: ContactMyEmployeeUpdateComponent;
    let fixture: ComponentFixture<ContactMyEmployeeUpdateComponent>;
    let service: ContactMyEmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [ContactMyEmployeeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContactMyEmployeeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactMyEmployeeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactMyEmployeeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactMyEmployee(123);
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
        const entity = new ContactMyEmployee();
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
