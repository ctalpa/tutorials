import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterTestSharedModule } from 'app/shared/shared.module';
import { DepartmentMyEmployeeComponent } from './department-my-employee.component';
import { DepartmentMyEmployeeDetailComponent } from './department-my-employee-detail.component';
import { DepartmentMyEmployeeUpdateComponent } from './department-my-employee-update.component';
import {
  DepartmentMyEmployeeDeletePopupComponent,
  DepartmentMyEmployeeDeleteDialogComponent
} from './department-my-employee-delete-dialog.component';
import { departmentRoute, departmentPopupRoute } from './department-my-employee.route';

const ENTITY_STATES = [...departmentRoute, ...departmentPopupRoute];

@NgModule({
  imports: [JhipsterTestSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    DepartmentMyEmployeeComponent,
    DepartmentMyEmployeeDetailComponent,
    DepartmentMyEmployeeUpdateComponent,
    DepartmentMyEmployeeDeleteDialogComponent,
    DepartmentMyEmployeeDeletePopupComponent
  ],
  entryComponents: [DepartmentMyEmployeeDeleteDialogComponent]
})
export class JhipsterTestDepartmentMyEmployeeModule {}
