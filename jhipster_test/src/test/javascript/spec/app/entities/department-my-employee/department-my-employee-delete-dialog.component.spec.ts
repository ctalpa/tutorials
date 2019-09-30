import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterTestTestModule } from '../../../test.module';
import { DepartmentMyEmployeeDeleteDialogComponent } from 'app/entities/department-my-employee/department-my-employee-delete-dialog.component';
import { DepartmentMyEmployeeService } from 'app/entities/department-my-employee/department-my-employee.service';

describe('Component Tests', () => {
  describe('DepartmentMyEmployee Management Delete Component', () => {
    let comp: DepartmentMyEmployeeDeleteDialogComponent;
    let fixture: ComponentFixture<DepartmentMyEmployeeDeleteDialogComponent>;
    let service: DepartmentMyEmployeeService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [DepartmentMyEmployeeDeleteDialogComponent]
      })
        .overrideTemplate(DepartmentMyEmployeeDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentMyEmployeeDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DepartmentMyEmployeeService);
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
