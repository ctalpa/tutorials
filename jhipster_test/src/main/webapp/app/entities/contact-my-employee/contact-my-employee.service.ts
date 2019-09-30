import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContactMyEmployee } from 'app/shared/model/contact-my-employee.model';

type EntityResponseType = HttpResponse<IContactMyEmployee>;
type EntityArrayResponseType = HttpResponse<IContactMyEmployee[]>;

@Injectable({ providedIn: 'root' })
export class ContactMyEmployeeService {
  public resourceUrl = SERVER_API_URL + 'api/contacts';

  constructor(protected http: HttpClient) {}

  create(contact: IContactMyEmployee): Observable<EntityResponseType> {
    return this.http.post<IContactMyEmployee>(this.resourceUrl, contact, { observe: 'response' });
  }

  update(contact: IContactMyEmployee): Observable<EntityResponseType> {
    return this.http.put<IContactMyEmployee>(this.resourceUrl, contact, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactMyEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactMyEmployee[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
