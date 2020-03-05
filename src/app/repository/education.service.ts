import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {Repository} from "@app/interface/Repository";
import {map} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EducationService implements Repository {

  constructor(
    private http: HttpClient
  ) {
  }

  public saveAll(data) {
    let res = [];
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
    return this.http.get(environment.apiUrl + 'user/educations')
      .pipe(map(value => {
        for (let valueKey in value) {
          value[valueKey].from = new Date(value[valueKey].from);
          value[valueKey].to = new Date(value[valueKey].to);
        }
        return value;
      }))
  }

  public save(data) {
    this._prepareData(data);
    let req = this.http.post(environment.apiUrl + 'user/education', data);
    return req;
  }

  public update(id, data) {
    this._prepareData(data);
    let req = this.http.put(environment.apiUrl + `user/education/${id}`, data);
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
    let req = this.http.delete(environment.apiUrl + `user/education/${id}`);
    return req;
  }

  private _prepareData(data: { from: any, to: any }) {
    data.from = new Date(data.from).toISOString().split('T')[0];
    data.to = new Date(data.to).toISOString().split('T')[0];
  }
}
