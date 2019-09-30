import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestTestModule } from '../../../test.module';
import { ContactTypeMyEmployeeDetailComponent } from 'app/entities/contact-type-my-employee/contact-type-my-employee-detail.component';
import { ContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';

describe('Component Tests', () => {
  describe('ContactTypeMyEmployee Management Detail Component', () => {
    let comp: ContactTypeMyEmployeeDetailComponent;
    let fixture: ComponentFixture<ContactTypeMyEmployeeDetailComponent>;
    const route = ({ data: of({ contactType: new ContactTypeMyEmployee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [ContactTypeMyEmployeeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContactTypeMyEmployeeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactTypeMyEmployeeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contactType).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
