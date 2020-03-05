import {Injectable} from '@angular/core';
import {Repository} from "@app/interface/Repository";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SkillService implements Repository {

  constructor(
    private http: HttpClient,
  ) {
  }

  public saveAll(data) {
    return this.save(data);
  }

  public getAll() {
    return this.http.get(environment.apiUrl + 'user/skills');
  }

  public save(data) {
    let req = this.http.post(environment.apiUrl + 'user/skills', data);
    return req;
  }

  public update(id, data) {
    throw new Error('Method not implemented');
  }

  public deleteAll(ids) {
    throw new Error('Method not implemented');
  }

  public delete(id) {
    throw new Error('Method not implemented');
  }
}
