import {Injectable} from '@angular/core';
import {Repository} from "@app/interface/Repository";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LanguageService implements Repository {

  constructor(
    private http: HttpClient
  ) {
  }

  public saveAll(data) {
    let res = [];
    data = {...data};
    for (let dataKey in data) {
      let id = data[dataKey].id;
      if (id) {
        res.push(this.update(id, data[dataKey]));
        continue;
      }
      res.push(this.save(data[dataKey]));
    }
    return forkJoin(res)
      .pipe(
        map((value: Array<any>) => {
          return {success: value.every(value1 => value1.success === true)}
        })
      );
  }

  public getAll() {
    return this.http.get(environment.apiUrl + 'user/languages');
  }

  public save(data) {
    let req = this.http.post(environment.apiUrl + 'user/language', data);
    return req;
  }

  public update(id, data) {
    let req = this.http.put(environment.apiUrl + `user/language/${id}`, data);
    return req;
  }

  public deleteAll(ids) {
    let res = [];
    for (let i in ids) {
      res.push(this.delete(ids[i]));
    }
    return forkJoin(res);
  }

  public delete(id) {
    let req = this.http.delete(environment.apiUrl + `user/language/${id}`);
    return req;
  }
}
