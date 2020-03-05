import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {AuthService} from "@app/service/auth.service";
import {map} from "rxjs/operators";
import {Repository} from "@app/interface/Repository";

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService implements Repository {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public save(data) {
    let body = {...data, email: this.authService.getUser().email};
    // @todo
    body.birth_date = body.birth_date.toISOString().split('T')[0];
    let req = this.http.put(environment.apiUrl + 'user/details', body);
    return req;
  }

  getAll() {
    return this.http.get(environment.apiUrl + 'user/details')
      .pipe(map(val => {
        // @ts-ignore
        val.birth_date = new Date(val.birth_date);
        return val;
      }));
  }

  delete(id) {
    throw new Error('Method not implemented');
  }

  deleteAll(ids) {
    throw new Error('Method not implemented');
  }

  saveAll(data) {
    throw new Error('Method not implemented');
  }

  update(id, data) {
    throw new Error('Method not implemented');
  }
}
