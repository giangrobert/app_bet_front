import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {END_POINTS, EntityDataService, IResponse} from "../../../../providers/utils";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService extends EntityDataService<any> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.setup.user);
  }

    public getInfo(): Observable<IResponse> {
        return this.httpClient.get<IResponse>(`${this.endPoint}/user`);
    }
}
