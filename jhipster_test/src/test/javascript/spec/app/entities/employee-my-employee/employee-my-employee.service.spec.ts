import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EmployeeMyEmployeeService } from 'app/entities/employee-my-employee/employee-my-employee.service';
import { IEmployeeMyEmployee, EmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

describe('Service Tests', () => {
  describe('EmployeeMyEmployee Service', () => {
    let injector: TestBed;
    let service: EmployeeMyEmployeeService;
    let httpMock: HttpTestingController;
    let elemDefault: IEmployeeMyEmployee;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(EmployeeMyEmployeeService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new EmployeeMyEmployee(0, 'AAAAAAA', 'AAAAAAA', 'AAAAAAA', 0, currentDate, currentDate, 0, Gender.MALE);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            hireDate: currentDate.format(DATE_TIME_FORMAT),
            terminationDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a EmployeeMyEmployee', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            hireDate: currentDate.format(DATE_TIME_FORMAT),
            terminationDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            hireDate: currentDate,
            terminationDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new EmployeeMyEmployee(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a EmployeeMyEmployee', () => {
        const returnedFromService = Object.assign(
          {
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            idNumber: 'BBBBBB',
            birthday: 1,
            hireDate: currentDate.format(DATE_TIME_FORMAT),
            terminationDate: currentDate.format(DATE_TIME_FORMAT),
            level: 1,
            gender: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            hireDate: currentDate,
            terminationDate: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of EmployeeMyEmployee', () => {
        const returnedFromService = Object.assign(
          {
            firstName: 'BBBBBB',
            lastName: 'BBBBBB',
            idNumber: 'BBBBBB',
            birthday: 1,
            hireDate: currentDate.format(DATE_TIME_FORMAT),
            terminationDate: currentDate.format(DATE_TIME_FORMAT),
            level: 1,
            gender: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            hireDate: currentDate,
            terminationDate: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a EmployeeMyEmployee', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
