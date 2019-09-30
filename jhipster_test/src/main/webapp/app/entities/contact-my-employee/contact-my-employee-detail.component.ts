import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IContactMyEmployee } from 'app/shared/model/contact-my-employee.model';

@Component({
  selector: 'jhi-contact-my-employee-detail',
  templateUrl: './contact-my-employee-detail.component.html'
})
export class ContactMyEmployeeDetailComponent implements OnInit {
  contact: IContactMyEmployee;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ contact }) => {
      this.contact = contact;
    });
  }

  previousState() {
    window.history.back();
  }
}
