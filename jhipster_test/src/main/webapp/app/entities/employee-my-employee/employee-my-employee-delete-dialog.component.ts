import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';
import { EmployeeMyEmployeeService } from './employee-my-employee.service';

@Component({
  selector: 'jhi-employee-my-employee-delete-dialog',
  templateUrl: './employee-my-employee-delete-dialog.component.html'
})
export class EmployeeMyEmployeeDeleteDialogComponent {
  employee: IEmployeeMyEmployee;

  constructor(
    protected employeeService: EmployeeMyEmployeeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.employeeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'employeeListModification',
        content: 'Deleted an employee'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-employee-my-employee-delete-popup',
  template: ''
})
export class EmployeeMyEmployeeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ employee }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(EmployeeMyEmployeeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.employee = employee;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/employee-my-employee', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/employee-my-employee', { outlets: { popup: null } }]);
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
