import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';
import { DepartmentMyEmployeeService } from './department-my-employee.service';
import { DepartmentMyEmployeeComponent } from './department-my-employee.component';
import { DepartmentMyEmployeeDetailComponent } from './department-my-employee-detail.component';
import { DepartmentMyEmployeeUpdateComponent } from './department-my-employee-update.component';
import { DepartmentMyEmployeeDeletePopupComponent } from './department-my-employee-delete-dialog.component';
import { IDepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';

@Injectable({ providedIn: 'root' })
export class DepartmentMyEmployeeResolve implements Resolve<IDepartmentMyEmployee> {
  constructor(private service: DepartmentMyEmployeeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDepartmentMyEmployee> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<DepartmentMyEmployee>) => response.ok),
        map((department: HttpResponse<DepartmentMyEmployee>) => department.body)
      );
    }
    return of(new DepartmentMyEmployee());
  }
}

export const departmentRoute: Routes = [
  {
    path: '',
    component: DepartmentMyEmployeeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhipsterTestApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DepartmentMyEmployeeDetailComponent,
    resolve: {
      department: DepartmentMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DepartmentMyEmployeeUpdateComponent,
    resolve: {
      department: DepartmentMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DepartmentMyEmployeeUpdateComponent,
    resolve: {
      department: DepartmentMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.department.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const departmentPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: DepartmentMyEmployeeDeletePopupComponent,
    resolve: {
      department: DepartmentMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.department.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
