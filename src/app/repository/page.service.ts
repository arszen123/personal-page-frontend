import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Repository} from "@app/interface/Repository";
import {environment} from "@environments/environment";
import {Observable, timer} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PageService implements Repository {
  protected url = 'user/page';
  private data;

  constructor(
    private http: HttpClient
  ) {
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
      this.http.get(environment.apiUrl + this.url)
        .subscribe(value => {
          this.data = value;
          subscriber.next(value);
          subscriber.complete();
        }, error => subscriber.error(error));
    })
  }

  saveAll(data) {
    return this.save(data);
  }

  save(data) {
    return this.http.post(environment.apiUrl + this.url, data)
      .pipe(map(value => {
        this.data = data;
        return value;
      }))
  }

  public deleteWidget(entityId, entityType) {
    if (!this.data) {
      return;
    }
    const oldWidgets = this.data.page;
    const newWidget = [];
    for (let id in oldWidgets) {
      if (oldWidgets[id].element === entityId && oldWidgets[id].type === entityType) {
        continue;
      }
      newWidget.push(oldWidgets[id])
    }
    this.data.page = newWidget;
  }

  update(id, data) {
    throw new Error('Method not implemented');
  }

  delete(id) {
    throw new Error('Method not implemented');
  }

  deleteAll(ids) {
    throw new Error('Method not implemented');
  }

  get(id) {
    throw new Error('Method not implemented');
  }
}
