import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { CreateUserModel } from './create-user.model';

@Injectable({ providedIn: 'root' })
export class CreateUserService {
  constructor(private http: HttpClient, private applicationConfigService: ApplicationConfigService) {}

  save(createuser: CreateUserModel): Observable<{}> {
    return this.http.post(this.applicationConfigService.getEndpointFor('api/enroll/create-user'), createuser);
  }
}
