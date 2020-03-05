import {Injectable} from '@angular/core';
import {Repository} from "@app/interface/Repository";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ContactService implements Repository {

  constructor(
    private http: HttpClient,
  ) {
  }

  public saveAll(data) {
    let res = [];
    for (let dataKey in data) {
      if (data[dataKey].id) {
        res.push(this.update(data[dataKey]));
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

  public save(data) {
    let req = this.http.post(environment.apiUrl + 'user/contact', data);
    return req;
  }

  public getAll() {
    return this.http.get(environment.apiUrl + 'user/contacts');
  }

  public update(data: any) {
    let req = this.http.put(environment.apiUrl + 'user/contact/' + data.id, data);
    return req;
  }

  public deleteAll(data: Array<string>) {
    let res = [];
    for (let dataKey in data) {
      res.push(this.delete(data[dataKey]));
    }
    return forkJoin(res);
  }

  public delete(id: string) {
    let req = this.http.delete(environment.apiUrl + 'user/contact/' + id);
    return req;
  }
}
