import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';
import { ContactTypeMyEmployeeService } from './contact-type-my-employee.service';

@Component({
  selector: 'jhi-contact-type-my-employee-delete-dialog',
  templateUrl: './contact-type-my-employee-delete-dialog.component.html'
})
export class ContactTypeMyEmployeeDeleteDialogComponent {
  contactType: IContactTypeMyEmployee;

  constructor(
    protected contactTypeService: ContactTypeMyEmployeeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.contactTypeService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'contactTypeListModification',
        content: 'Deleted an contactType'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-contact-type-my-employee-delete-popup',
  template: ''
})
export class ContactTypeMyEmployeeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contactType }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContactTypeMyEmployeeDeleteDialogComponent as Component, {
          size: 'lg',
          backdrop: 'static'
        });
        this.ngbModalRef.componentInstance.contactType = contactType;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/contact-type-my-employee', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/contact-type-my-employee', { outlets: { popup: null } }]);
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
