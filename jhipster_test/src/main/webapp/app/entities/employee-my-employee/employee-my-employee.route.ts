import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';
import { EmployeeMyEmployeeService } from './employee-my-employee.service';
import { EmployeeMyEmployeeComponent } from './employee-my-employee.component';
import { EmployeeMyEmployeeDetailComponent } from './employee-my-employee-detail.component';
import { EmployeeMyEmployeeUpdateComponent } from './employee-my-employee-update.component';
import { EmployeeMyEmployeeDeletePopupComponent } from './employee-my-employee-delete-dialog.component';
import { IEmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';

@Injectable({ providedIn: 'root' })
export class EmployeeMyEmployeeResolve implements Resolve<IEmployeeMyEmployee> {
  constructor(private service: EmployeeMyEmployeeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployeeMyEmployee> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<EmployeeMyEmployee>) => response.ok),
        map((employee: HttpResponse<EmployeeMyEmployee>) => employee.body)
      );
    }
    return of(new EmployeeMyEmployee());
  }
}

export const employeeRoute: Routes = [
  {
    path: '',
    component: EmployeeMyEmployeeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhipsterTestApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EmployeeMyEmployeeDetailComponent,
    resolve: {
      employee: EmployeeMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EmployeeMyEmployeeUpdateComponent,
    resolve: {
      employee: EmployeeMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EmployeeMyEmployeeUpdateComponent,
    resolve: {
      employee: EmployeeMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const employeePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: EmployeeMyEmployeeDeletePopupComponent,
    resolve: {
      employee: EmployeeMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.employee.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
