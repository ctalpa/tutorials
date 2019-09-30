import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestTestModule } from '../../../test.module';
import { EmployeeMyEmployeeDetailComponent } from 'app/entities/employee-my-employee/employee-my-employee-detail.component';
import { EmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';

describe('Component Tests', () => {
  describe('EmployeeMyEmployee Management Detail Component', () => {
    let comp: EmployeeMyEmployeeDetailComponent;
    let fixture: ComponentFixture<EmployeeMyEmployeeDetailComponent>;
    const route = ({ data: of({ employee: new EmployeeMyEmployee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [EmployeeMyEmployeeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(EmployeeMyEmployeeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(EmployeeMyEmployeeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.employee).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
