import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';

@Component({
  selector: 'jhi-contact-type-my-employee-detail',
  templateUrl: './contact-type-my-employee-detail.component.html'
})
export class ContactTypeMyEmployeeDetailComponent implements OnInit {
  contactType: IContactTypeMyEmployee;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contactType }) => {
      this.contactType = contactType;
    });
  }

  previousState() {
    window.history.back();
  }
}
