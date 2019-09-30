import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'department-my-employee',
        loadChildren: () =>
          import('./department-my-employee/department-my-employee.module').then(m => m.JhipsterTestDepartmentMyEmployeeModule)
      },
      {
        path: 'employee-my-employee',
        loadChildren: () => import('./employee-my-employee/employee-my-employee.module').then(m => m.JhipsterTestEmployeeMyEmployeeModule)
      },
      {
        path: 'contact-type-my-employee',
        loadChildren: () =>
          import('./contact-type-my-employee/contact-type-my-employee.module').then(m => m.JhipsterTestContactTypeMyEmployeeModule)
      },
      {
        path: 'contact-my-employee',
        loadChildren: () => import('./contact-my-employee/contact-my-employee.module').then(m => m.JhipsterTestContactMyEmployeeModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class JhipsterTestEntityModule {}
