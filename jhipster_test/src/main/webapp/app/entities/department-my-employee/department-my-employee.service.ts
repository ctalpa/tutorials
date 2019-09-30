import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDepartmentMyEmployee } from 'app/shared/model/department-my-employee.model';

type EntityResponseType = HttpResponse<IDepartmentMyEmployee>;
type EntityArrayResponseType = HttpResponse<IDepartmentMyEmployee[]>;

@Injectable({ providedIn: 'root' })
export class DepartmentMyEmployeeService {
  public resourceUrl = SERVER_API_URL + 'api/departments';

  constructor(protected http: HttpClient) {}

  create(department: IDepartmentMyEmployee): Observable<EntityResponseType> {
    return this.http.post<IDepartmentMyEmployee>(this.resourceUrl, department, { observe: 'response' });
  }

  update(department: IDepartmentMyEmployee): Observable<EntityResponseType> {
    return this.http.put<IDepartmentMyEmployee>(this.resourceUrl, department, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDepartmentMyEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDepartmentMyEmployee[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
