import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {AuthService} from "@app/service/auth.service";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService {

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
    req.subscribe((al) => console.log(al), err => console.log(err));
    return req;
  }

  public getPersonalData() {
    return this.http.get(environment.apiUrl + 'user/details')
      .pipe(map(val => {
        // @ts-ignore
        val.birth_date = new Date(val.birth_date);
        return val;
      }));
  }
}
