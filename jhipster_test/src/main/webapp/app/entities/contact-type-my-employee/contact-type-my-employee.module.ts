import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterTestSharedModule } from 'app/shared/shared.module';
import { ContactTypeMyEmployeeComponent } from './contact-type-my-employee.component';
import { ContactTypeMyEmployeeDetailComponent } from './contact-type-my-employee-detail.component';
import { ContactTypeMyEmployeeUpdateComponent } from './contact-type-my-employee-update.component';
import {
  ContactTypeMyEmployeeDeletePopupComponent,
  ContactTypeMyEmployeeDeleteDialogComponent
} from './contact-type-my-employee-delete-dialog.component';
import { contactTypeRoute, contactTypePopupRoute } from './contact-type-my-employee.route';

const ENTITY_STATES = [...contactTypeRoute, ...contactTypePopupRoute];

@NgModule({
  imports: [JhipsterTestSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    ContactTypeMyEmployeeComponent,
    ContactTypeMyEmployeeDetailComponent,
    ContactTypeMyEmployeeUpdateComponent,
    ContactTypeMyEmployeeDeleteDialogComponent,
    ContactTypeMyEmployeeDeletePopupComponent
  ],
  entryComponents: [ContactTypeMyEmployeeDeleteDialogComponent]
})
export class JhipsterTestContactTypeMyEmployeeModule {}
