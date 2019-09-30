import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';

@Component({
  selector: 'jhi-employee-my-employee-detail',
  templateUrl: './employee-my-employee-detail.component.html'
})
export class EmployeeMyEmployeeDetailComponent implements OnInit {
  employee: IEmployeeMyEmployee;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ employee }) => {
      this.employee = employee;
    });
  }

  previousState() {
    window.history.back();
  }
}
