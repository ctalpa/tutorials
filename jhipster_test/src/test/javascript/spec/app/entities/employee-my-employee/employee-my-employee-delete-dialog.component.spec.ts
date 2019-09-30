import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestTestModule } from '../../../test.module';
import { EmployeeMyEmployeeDeleteDialogComponent } from 'app/entities/employee-my-employee/employee-my-employee-delete-dialog.component';
import { EmployeeMyEmployeeService } from 'app/entities/employee-my-employee/employee-my-employee.service';

describe('Component Tests', () => {
  describe('EmployeeMyEmployee Management Delete Component', () => {
    let comp: EmployeeMyEmployeeDeleteDialogComponent;
    let fixture: ComponentFixture<EmployeeMyEmployeeDeleteDialogComponent>;
    let service: EmployeeMyEmployeeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [EmployeeMyEmployeeDeleteDialogComponent]
      })
        .overrideTemplate(EmployeeMyEmployeeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeMyEmployeeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EmployeeMyEmployeeService);
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
