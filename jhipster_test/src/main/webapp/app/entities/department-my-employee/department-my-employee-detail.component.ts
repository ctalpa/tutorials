import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';

@Component({
  selector: 'jhi-department-my-employee-detail',
  templateUrl: './department-my-employee-detail.component.html'
})
export class DepartmentMyEmployeeDetailComponent implements OnInit {
  department: IDepartmentMyEmployee;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ department }) => {
      this.department = department;
    });
  }

  previousState() {
    window.history.back();
  }
}
