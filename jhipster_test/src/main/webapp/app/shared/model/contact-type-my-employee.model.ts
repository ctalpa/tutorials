export interface IContactTypeMyEmployee {
  id?: number;
  name?: string;
}

export class ContactTypeMyEmployee implements IContactTypeMyEmployee {
  constructor(public id?: number, public name?: string) {}
}
