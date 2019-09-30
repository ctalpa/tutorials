import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterTestSharedModule } from 'app/shared/shared.module';
import { ContactMyEmployeeComponent } from './contact-my-employee.component';
import { ContactMyEmployeeDetailComponent } from './contact-my-employee-detail.component';
import { ContactMyEmployeeUpdateComponent } from './contact-my-employee-update.component';
import {
  ContactMyEmployeeDeletePopupComponent,
  ContactMyEmployeeDeleteDialogComponent
} from './contact-my-employee-delete-dialog.component';
import { contactRoute, contactPopupRoute } from './contact-my-employee.route';

const ENTITY_STATES = [...contactRoute, ...contactPopupRoute];

@NgModule({
  imports: [JhipsterTestSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContactMyEmployeeComponent,
    ContactMyEmployeeDetailComponent,
    ContactMyEmployeeUpdateComponent,
    ContactMyEmployeeDeleteDialogComponent,
    ContactMyEmployeeDeletePopupComponent
  ],
  entryComponents: [ContactMyEmployeeDeleteDialogComponent]
})
export class JhipsterTestContactMyEmployeeModule {}
