import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';
import { ContactTypeMyEmployeeService } from './contact-type-my-employee.service';
import { ContactTypeMyEmployeeComponent } from './contact-type-my-employee.component';
import { ContactTypeMyEmployeeDetailComponent } from './contact-type-my-employee-detail.component';
import { ContactTypeMyEmployeeUpdateComponent } from './contact-type-my-employee-update.component';
import { ContactTypeMyEmployeeDeletePopupComponent } from './contact-type-my-employee-delete-dialog.component';
import { IContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';

@Injectable({ providedIn: 'root' })
export class ContactTypeMyEmployeeResolve implements Resolve<IContactTypeMyEmployee> {
  constructor(private service: ContactTypeMyEmployeeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContactTypeMyEmployee> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ContactTypeMyEmployee>) => response.ok),
        map((contactType: HttpResponse<ContactTypeMyEmployee>) => contactType.body)
      );
    }
    return of(new ContactTypeMyEmployee());
  }
}

export const contactTypeRoute: Routes = [
  {
    path: '',
    component: ContactTypeMyEmployeeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhipsterTestApp.contactType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContactTypeMyEmployeeDetailComponent,
    resolve: {
      contactType: ContactTypeMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.contactType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContactTypeMyEmployeeUpdateComponent,
    resolve: {
      contactType: ContactTypeMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.contactType.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContactTypeMyEmployeeUpdateComponent,
    resolve: {
      contactType: ContactTypeMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.contactType.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const contactTypePopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContactTypeMyEmployeeDeletePopupComponent,
    resolve: {
      contactType: ContactTypeMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.contactType.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
