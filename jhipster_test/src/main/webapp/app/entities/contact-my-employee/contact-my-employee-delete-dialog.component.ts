import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IContactMyEmployee } from 'app/shared/model/contact-my-employee.model';
import { ContactMyEmployeeService } from './contact-my-employee.service';

@Component({
  selector: 'jhi-contact-my-employee-delete-dialog',
  templateUrl: './contact-my-employee-delete-dialog.component.html'
})
export class ContactMyEmployeeDeleteDialogComponent {
  contact: IContactMyEmployee;

  constructor(
    protected contactService: ContactMyEmployeeService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.contactService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'contactListModification',
        content: 'Deleted an contact'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-contact-my-employee-delete-popup',
  template: ''
})
export class ContactMyEmployeeDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contact }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ContactMyEmployeeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.contact = contact;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/contact-my-employee', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/contact-my-employee', { outlets: { popup: null } }]);
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
