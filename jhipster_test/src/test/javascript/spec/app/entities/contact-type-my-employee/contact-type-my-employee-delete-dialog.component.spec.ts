import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestTestModule } from '../../../test.module';
import { ContactTypeMyEmployeeDeleteDialogComponent } from 'app/entities/contact-type-my-employee/contact-type-my-employee-delete-dialog.component';
import { ContactTypeMyEmployeeService } from 'app/entities/contact-type-my-employee/contact-type-my-employee.service';

describe('Component Tests', () => {
  describe('ContactTypeMyEmployee Management Delete Component', () => {
    let comp: ContactTypeMyEmployeeDeleteDialogComponent;
    let fixture: ComponentFixture<ContactTypeMyEmployeeDeleteDialogComponent>;
    let service: ContactTypeMyEmployeeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [ContactTypeMyEmployeeDeleteDialogComponent]
      })
        .overrideTemplate(ContactTypeMyEmployeeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactTypeMyEmployeeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ContactTypeMyEmployeeService);
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
