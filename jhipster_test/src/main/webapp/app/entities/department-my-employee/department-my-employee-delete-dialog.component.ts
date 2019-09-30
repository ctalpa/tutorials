import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';
import { DepartmentMyEmployeeService } from './department-my-employee.service';

@Component({
  selector: 'jhi-department-my-employee-delete-dialog',
  templateUrl: './department-my-employee-delete-dialog.component.html'
})
export class DepartmentMyEmployeeDeleteDialogComponent {
  department: IDepartmentMyEmployee;

  constructor(
    protected departmentService: DepartmentMyEmployeeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.departmentService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'departmentListModification',
        content: 'Deleted an department'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-department-my-employee-delete-popup',
  template: ''
})
export class DepartmentMyEmployeeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(DepartmentMyEmployeeDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.department = department;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/department-my-employee', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/department-my-employee', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
