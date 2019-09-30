import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IContactTypeMyEmployee } from 'app/shared/model/contact-type-my-employee.model';

type EntityResponseType = HttpResponse<IContactTypeMyEmployee>;
type EntityArrayResponseType = HttpResponse<IContactTypeMyEmployee[]>;

@Injectable({ providedIn: 'root' })
export class ContactTypeMyEmployeeService {
  public resourceUrl = SERVER_API_URL + 'api/contact-types';

  constructor(protected http: HttpClient) {}

  create(contactType: IContactTypeMyEmployee): Observable<EntityResponseType> {
    return this.http.post<IContactTypeMyEmployee>(this.resourceUrl, contactType, { observe: 'response' });
  }

  update(contactType: IContactTypeMyEmployee): Observable<EntityResponseType> {
    return this.http.put<IContactTypeMyEmployee>(this.resourceUrl, contactType, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IContactTypeMyEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IContactTypeMyEmployee[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
