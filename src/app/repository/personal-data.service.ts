import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {AuthService} from "@app/service/auth.service";
import {Repository} from "@app/interface/Repository";
import {Observable, timer} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PersonalDataService implements Repository {
  private data;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
  }

  public save(data) {
    let body = {...data, email: this.authService.getUser().email};
    if (body.profile_picture === '') {
      delete body.profile_picture;
    }
    if (body.profile_picture === null) {
      body.profile_picture = 'delete';
    }
    if (typeof body.birth_date !== 'string') {
      body.birth_date = body.birth_date.toISOString().split('T')[0];
    }
    return this.http.put(environment.apiUrl + 'user/details', body)
      .pipe(map(value => {
        let pp = this.data.profile_picture;
        if (body.profile_picture === 'delete') {
          pp = '';
        }
        if (body.profile_picture && body.profile_picture !== 'delete') {
          pp = body.profile_picture;
        }
        this.data = body;
        this.data.profile_picture = pp;
        return value;
      }));
  }

  getAll() {
    return new Observable(subscriber => {
      if (this.data) {
        timer(0)
          .subscribe(() => {
            subscriber.next(this.data);
            subscriber.complete();
          });
        return;
      }
      this.http.get(environment.apiUrl + 'user/details')
        .subscribe((value: any) => {
          value.birth_date = new Date(value.birth_date);
          this.data = value;
          subscriber.next(value);
          subscriber.complete();
        }, error => subscriber.error(error));
    })
  }

  public getPersonalData() {
      return this.data;
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

  get(id) {
    throw new Error('Method not implemented');
  }
}
