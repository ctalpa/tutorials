import { Moment } from 'moment';
import { IContactMyEmployee } from 'app/shared/model/contact-my-employee.model';
import { IDepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';
import { Gender } from 'app/shared/model/enumerations/gender.model';

export interface IEmployeeMyEmployee {
  id?: number;
  firstName?: string;
  lastName?: string;
  idNumber?: string;
  birthday?: number;
  hireDate?: Moment;
  terminationDate?: Moment;
  level?: number;
  gender?: Gender;
  contacts?: IContactMyEmployee[];
  departments?: IDepartmentMyEmployee[];
}

export class EmployeeMyEmployee implements IEmployeeMyEmployee {
  constructor(
    public id?: number,
    public firstName?: string,
    public lastName?: string,
    public idNumber?: string,
    public birthday?: number,
    public hireDate?: Moment,
    public terminationDate?: Moment,
    public level?: number,
    public gender?: Gender,
    public contacts?: IContactMyEmployee[],
    public departments?: IDepartmentMyEmployee[]
  ) {}
}
