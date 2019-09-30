import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDepartmentMyEmployee, DepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';
import { DepartmentMyEmployeeService } from './department-my-employee.service';
import { IEmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';
import { EmployeeMyEmployeeService } from 'app/entities/employee-my-employee/employee-my-employee.service';

@Component({
  selector: 'jhi-department-my-employee-update',
  templateUrl: './department-my-employee-update.component.html'
})
export class DepartmentMyEmployeeUpdateComponent implements OnInit {
  isSaving: boolean;

  employees: IEmployeeMyEmployee[];

  editForm = this.fb.group({
    id: [],
    departmentName: [null, [Validators.required, Validators.maxLength(50)]]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected departmentService: DepartmentMyEmployeeService,
    protected employeeService: EmployeeMyEmployeeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ department }) => {
      this.updateForm(department);
    });
    this.employeeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEmployeeMyEmployee[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEmployeeMyEmployee[]>) => response.body)
      )
      .subscribe((res: IEmployeeMyEmployee[]) => (this.employees = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(department: IDepartmentMyEmployee) {
    this.editForm.patchValue({
      id: department.id,
      departmentName: department.departmentName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const department = this.createFromForm();
    if (department.id !== undefined) {
      this.subscribeToSaveResponse(this.departmentService.update(department));
    } else {
      this.subscribeToSaveResponse(this.departmentService.create(department));
    }
  }

  private createFromForm(): IDepartmentMyEmployee {
    return {
      ...new DepartmentMyEmployee(),
      id: this.editForm.get(['id']).value,
      departmentName: this.editForm.get(['departmentName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDepartmentMyEmployee>>) {
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

  trackEmployeeById(index: number, item: IEmployeeMyEmployee) {
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
