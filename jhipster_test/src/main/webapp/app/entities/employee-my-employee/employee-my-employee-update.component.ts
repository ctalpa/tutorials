import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IEmployeeMyEmployee, EmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';
import { EmployeeMyEmployeeService } from './employee-my-employee.service';
import { IDepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';
import { DepartmentMyEmployeeService } from 'app/entities/department-my-employee/department-my-employee.service';

@Component({
  selector: 'jhi-employee-my-employee-update',
  templateUrl: './employee-my-employee-update.component.html'
})
export class EmployeeMyEmployeeUpdateComponent implements OnInit {
  isSaving: boolean;

  departments: IDepartmentMyEmployee[];

  editForm = this.fb.group({
    id: [],
    firstName: [null, [Validators.required, Validators.maxLength(50)]],
    lastName: [null, [Validators.required, Validators.maxLength(50)]],
    idNumber: [],
    birthday: [],
    hireDate: [],
    terminationDate: [],
    level: [],
    gender: [],
    departments: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected employeeService: EmployeeMyEmployeeService,
    protected departmentService: DepartmentMyEmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.updateForm(employee);
    });
    this.departmentService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDepartmentMyEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDepartmentMyEmployee[]>) => response.body)
      )
      .subscribe((res: IDepartmentMyEmployee[]) => (this.departments = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(employee: IEmployeeMyEmployee) {
    this.editForm.patchValue({
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      idNumber: employee.idNumber,
      birthday: employee.birthday,
      hireDate: employee.hireDate != null ? employee.hireDate.format(DATE_TIME_FORMAT) : null,
      terminationDate: employee.terminationDate != null ? employee.terminationDate.format(DATE_TIME_FORMAT) : null,
      level: employee.level,
      gender: employee.gender,
      departments: employee.departments
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const employee = this.createFromForm();
    if (employee.id !== undefined) {
      this.subscribeToSaveResponse(this.employeeService.update(employee));
    } else {
      this.subscribeToSaveResponse(this.employeeService.create(employee));
    }
  }

  private createFromForm(): IEmployeeMyEmployee {
    return {
      ...new EmployeeMyEmployee(),
      id: this.editForm.get(['id']).value,
      firstName: this.editForm.get(['firstName']).value,
      lastName: this.editForm.get(['lastName']).value,
      idNumber: this.editForm.get(['idNumber']).value,
      birthday: this.editForm.get(['birthday']).value,
      hireDate: this.editForm.get(['hireDate']).value != null ? moment(this.editForm.get(['hireDate']).value, DATE_TIME_FORMAT) : undefined,
      terminationDate:
        this.editForm.get(['terminationDate']).value != null
          ? moment(this.editForm.get(['terminationDate']).value, DATE_TIME_FORMAT)
          : undefined,
      level: this.editForm.get(['level']).value,
      gender: this.editForm.get(['gender']).value,
      departments: this.editForm.get(['departments']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmployeeMyEmployee>>) {
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

  trackDepartmentById(index: number, item: IDepartmentMyEmployee) {
    return item.id;
  }

  getSelected(selectedVals: any[], option: any) {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
