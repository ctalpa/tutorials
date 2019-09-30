import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterTestSharedModule } from 'app/shared/shared.module';
import { EmployeeMyEmployeeComponent } from './employee-my-employee.component';
import { EmployeeMyEmployeeDetailComponent } from './employee-my-employee-detail.component';
import { EmployeeMyEmployeeUpdateComponent } from './employee-my-employee-update.component';
import {
  EmployeeMyEmployeeDeletePopupComponent,
  EmployeeMyEmployeeDeleteDialogComponent
} from './employee-my-employee-delete-dialog.component';
import { employeeRoute, employeePopupRoute } from './employee-my-employee.route';

const ENTITY_STATES = [...employeeRoute, ...employeePopupRoute];

@NgModule({
  imports: [JhipsterTestSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    EmployeeMyEmployeeComponent,
    EmployeeMyEmployeeDetailComponent,
    EmployeeMyEmployeeUpdateComponent,
    EmployeeMyEmployeeDeleteDialogComponent,
    EmployeeMyEmployeeDeletePopupComponent
  ],
  entryComponents: [EmployeeMyEmployeeDeleteDialogComponent]
})
export class JhipsterTestEmployeeMyEmployeeModule {}
