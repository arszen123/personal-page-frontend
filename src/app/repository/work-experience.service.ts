import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {Repository} from "@app/interface/Repository";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WorkExperienceService implements Repository {

  constructor(
    private http: HttpClient
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
    let req = this.http.post(environment.apiUrl + 'user/work-experience', data);
    return req;
  }

  public getAll() {
    return this.http.get(environment.apiUrl + 'user/work-experiences');
  }

  public update(data: any) {
    let req = this.http.put(environment.apiUrl + 'user/work-experience/' + data.id, data);
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
    let req = this.http.delete(environment.apiUrl + 'user/work-experience/' + id);
    return req;
  }
}
