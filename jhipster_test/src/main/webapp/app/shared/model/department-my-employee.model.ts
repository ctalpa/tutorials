import { IEmployeeMyEmployee } from 'app/shared/model/employee-my-employee.model';

export interface IDepartmentMyEmployee {
  id?: number;
  departmentName?: string;
  employees?: IEmployeeMyEmployee[];
}

export class DepartmentMyEmployee implements IDepartmentMyEmployee {
  constructor(public id?: number, public departmentName?: string, public employees?: IEmployeeMyEmployee[]) {}
}
