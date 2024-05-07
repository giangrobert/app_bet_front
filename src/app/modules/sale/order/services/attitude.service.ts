import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {END_POINTS, EntityDataService} from "../../../../providers/utils";

@Injectable({providedIn: 'root'})
export class AttitudeService extends EntityDataService<any> {
  constructor(protected override httpClient: HttpClient) {
    super(httpClient, END_POINTS.setup.attitude);
  }
}
