export interface IContactMyEmployee {
  id?: number;
  value?: string;
  contactCompany?: boolean;
  contactTypeId?: number;
  employeeId?: number;
}

export class ContactMyEmployee implements IContactMyEmployee {
  constructor(
    public id?: number,
    public value?: string,
    public contactCompany?: boolean,
    public contactTypeId?: number,
    public employeeId?: number
  ) {
    this.contactCompany = this.contactCompany || false;
  }
}
