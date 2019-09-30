import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IContactMyEmployee, ContactMyEmployee } from 'app/shared/model/contact-my-employee.model';
import { ContactMyEmployeeService } from './contact-my-employee.service';
import { IContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';
import { ContactTypeMyEmployeeService } from 'app/entities/contact-type-my-employee/contact-type-my-employee.service';
import { IEmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';
import { EmployeeMyEmployeeService } from 'app/entities/employee-my-employee/employee-my-employee.service';

@Component({
  selector: 'jhi-contact-my-employee-update',
  templateUrl: './contact-my-employee-update.component.html'
})
export class ContactMyEmployeeUpdateComponent implements OnInit {
  isSaving: boolean;

  contacttypes: IContactTypeMyEmployee[];

  employees: IEmployeeMyEmployee[];

  editForm = this.fb.group({
    id: [],
    value: [],
    contactCompany: [],
    contactTypeId: [],
    employeeId: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected contactService: ContactMyEmployeeService,
    protected contactTypeService: ContactTypeMyEmployeeService,
    protected employeeService: EmployeeMyEmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ contact }) => {
      this.updateForm(contact);
    });
    this.contactTypeService
      .query({ filter: 'contact-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IContactTypeMyEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IContactTypeMyEmployee[]>) => response.body)
      )
      .subscribe(
        (res: IContactTypeMyEmployee[]) => {
          if (!this.editForm.get('contactTypeId').value) {
            this.contacttypes = res;
          } else {
            this.contactTypeService
              .find(this.editForm.get('contactTypeId').value)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IContactTypeMyEmployee>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IContactTypeMyEmployee>) => subResponse.body)
              )
              .subscribe(
                (subRes: IContactTypeMyEmployee) => (this.contacttypes = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployeeMyEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployeeMyEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployeeMyEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(contact: IContactMyEmployee) {
    this.editForm.patchValue({
      id: contact.id,
      value: contact.value,
      contactCompany: contact.contactCompany,
      contactTypeId: contact.contactTypeId,
      employeeId: contact.employeeId
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const contact = this.createFromForm();
    if (contact.id !== undefined) {
      this.subscribeToSaveResponse(this.contactService.update(contact));
    } else {
      this.subscribeToSaveResponse(this.contactService.create(contact));
    }
  }

  private createFromForm(): IContactMyEmployee {
    return {
      ...new ContactMyEmployee(),
      id: this.editForm.get(['id']).value,
      value: this.editForm.get(['value']).value,
      contactCompany: this.editForm.get(['contactCompany']).value,
      contactTypeId: this.editForm.get(['contactTypeId']).value,
      employeeId: this.editForm.get(['employeeId']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactMyEmployee>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackContactTypeById(index: number, item: IContactTypeMyEmployee) {
    return item.id;
  }

  trackEmployeeById(index: number, item: IEmployeeMyEmployee) {
    return item.id;
  }
}
