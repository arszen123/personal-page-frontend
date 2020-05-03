import {Injectable} from '@angular/core';
import {Repository} from "@app/interface/Repository";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {map} from "rxjs/operators";
import {Observable, timer} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkillService implements Repository {
  private data;

  constructor(
    private http: HttpClient,
  ) {
  }

  public saveAll(data) {
    return this.save(data)
      .pipe(map(value => {
        this.data = data;
        return value;
      }))
  }

  public getAll() {
    return new Observable(subscriber => {
      if (this.data) {
        timer(0)
          .subscribe(() =>{
            subscriber.next(this.data);
            subscriber.complete();
          });
        return;
      }
      this.http.get(environment.apiUrl + 'user/skills')
        .subscribe(value => {
          this.data = value;
          subscriber.next(value);
          subscriber.complete();
        }, error => subscriber.error(error));
    });
  }

  public save(data) {
    return this.http.post(environment.apiUrl + 'user/skills', data).pipe(map(value => {
      this.data = data.skill;
      return value;
    }))
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

  public get(id) {
    return this.getAll();
  }
}
