import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestTestModule } from '../../../test.module';
import { ContactMyEmployeeDeleteDialogComponent } from 'app/entities/contact-my-employee/contact-my-employee-delete-dialog.component';
import { ContactMyEmployeeService } from 'app/entities/contact-my-employee/contact-my-employee.service';

describe('Component Tests', () => {
  describe('ContactMyEmployee Management Delete Component', () => {
    let comp: ContactMyEmployeeDeleteDialogComponent;
    let fixture: ComponentFixture<ContactMyEmployeeDeleteDialogComponent>;
    let service: ContactMyEmployeeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [ContactMyEmployeeDeleteDialogComponent]
      })
        .overrideTemplate(ContactMyEmployeeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactMyEmployeeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactMyEmployeeService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
