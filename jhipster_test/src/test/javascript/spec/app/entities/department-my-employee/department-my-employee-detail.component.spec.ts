import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterTestTestModule } from '../../../test.module';
import { DepartmentMyEmployeeDetailComponent } from 'app/entities/department-my-employee/department-my-employee-detail.component';
import { DepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';

describe('Component Tests', () => {
  describe('DepartmentMyEmployee Management Detail Component', () => {
    let comp: DepartmentMyEmployeeDetailComponent;
    let fixture: ComponentFixture<DepartmentMyEmployeeDetailComponent>;
    const route = ({ data: of({ department: new DepartmentMyEmployee(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [JhipsterTestTestModule],
        declarations: [DepartmentMyEmployeeDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(DepartmentMyEmployeeDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DepartmentMyEmployeeDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.department).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
