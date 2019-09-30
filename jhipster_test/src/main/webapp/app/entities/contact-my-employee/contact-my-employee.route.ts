import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ContactMyEmployee } from 'app/shared/model/contact-my-employee.model';
import { ContactMyEmployeeService } from './contact-my-employee.service';
import { ContactMyEmployeeComponent } from './contact-my-employee.component';
import { ContactMyEmployeeDetailComponent } from './contact-my-employee-detail.component';
import { ContactMyEmployeeUpdateComponent } from './contact-my-employee-update.component';
import { ContactMyEmployeeDeletePopupComponent } from './contact-my-employee-delete-dialog.component';
import { IContactMyEmployee } from 'app/shared/model/contact-my-employee.model';

@Injectable({ providedIn: 'root' })
export class ContactMyEmployeeResolve implements Resolve<IContactMyEmployee> {
  constructor(private service: ContactMyEmployeeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IContactMyEmployee> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<ContactMyEmployee>) => response.ok),
        map((contact: HttpResponse<ContactMyEmployee>) => contact.body)
      );
    }
    return of(new ContactMyEmployee());
  }
}

export const contactRoute: Routes = [
  {
    path: '',
    component: ContactMyEmployeeComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'jhipsterTestApp.contact.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ContactMyEmployeeDetailComponent,
    resolve: {
      contact: ContactMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.contact.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ContactMyEmployeeUpdateComponent,
    resolve: {
      contact: ContactMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.contact.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ContactMyEmployeeUpdateComponent,
    resolve: {
      contact: ContactMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.contact.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const contactPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ContactMyEmployeeDeletePopupComponent,
    resolve: {
      contact: ContactMyEmployeeResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'jhipsterTestApp.contact.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
