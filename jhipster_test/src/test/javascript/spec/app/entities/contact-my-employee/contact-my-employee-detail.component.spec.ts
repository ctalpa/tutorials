import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestTestModule } from '../../../test.module';
import { ContactMyEmployeeDetailComponent } from 'app/entities/contact-my-employee/contact-my-employee-detail.component';
import { ContactMyEmployee } from 'app/shared/model/contact-my-employee.model';

describe('Component Tests', () => {
  describe('ContactMyEmployee Management Detail Component', () => {
    let comp: ContactMyEmployeeDetailComponent;
    let fixture: ComponentFixture<ContactMyEmployeeDetailComponent>;
    const route = ({ data: of({ contact: new ContactMyEmployee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [ContactMyEmployeeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ContactMyEmployeeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ContactMyEmployeeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.contact).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
