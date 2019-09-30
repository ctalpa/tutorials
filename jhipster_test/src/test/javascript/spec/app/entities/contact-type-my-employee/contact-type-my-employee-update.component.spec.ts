import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { JhipsterTestTestModule } from '../../../test.module';
import { ContactTypeMyEmployeeUpdateComponent } from 'app/entities/contact-type-my-employee/contact-type-my-employee-update.component';
import { ContactTypeMyEmployeeService } from 'app/entities/contact-type-my-employee/contact-type-my-employee.service';
import { ContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';

describe('Component Tests', () => {
  describe('ContactTypeMyEmployee Management Update Component', () => {
    let comp: ContactTypeMyEmployeeUpdateComponent;
    let fixture: ComponentFixture<ContactTypeMyEmployeeUpdateComponent>;
    let service: ContactTypeMyEmployeeService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [ContactTypeMyEmployeeUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ContactTypeMyEmployeeUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ContactTypeMyEmployeeUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactTypeMyEmployeeService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ContactTypeMyEmployee(123);
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
        const entity = new ContactTypeMyEmployee();
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
