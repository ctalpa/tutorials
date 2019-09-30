import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IContactTypeMyEmployee, ContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';
import { ContactTypeMyEmployeeService } from './contact-type-my-employee.service';

@Component({
  selector: 'jhi-contact-type-my-employee-update',
  templateUrl: './contact-type-my-employee-update.component.html'
})
export class ContactTypeMyEmployeeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: []
  });

  constructor(
    protected contactTypeService: ContactTypeMyEmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ contactType }) => {
      this.updateForm(contactType);
    });
  }

  updateForm(contactType: IContactTypeMyEmployee) {
    this.editForm.patchValue({
      id: contactType.id,
      name: contactType.name
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const contactType = this.createFromForm();
    if (contactType.id !== undefined) {
      this.subscribeToSaveResponse(this.contactTypeService.update(contactType));
    } else {
      this.subscribeToSaveResponse(this.contactTypeService.create(contactType));
    }
  }

  private createFromForm(): IContactTypeMyEmployee {
    return {
      ...new ContactTypeMyEmployee(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IContactTypeMyEmployee>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
