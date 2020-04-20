import {Repository} from "@app/interface/Repository";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {forkJoin, Observable, of, timer} from "rxjs";
import {map} from "rxjs/operators";

export class BaseRepository implements Repository {
  protected url = null;
  protected collectionUrl = null;
  protected http: HttpClient;
  private elements = null;
  private elements$: Observable<Object>;

  public saveAll(data) {
    let res = [];
    for (let dataKey in data) {
      if (!data.hasOwnProperty(dataKey)) continue;
      data[dataKey].is_current = !!data[dataKey].is_current;
      if (data[dataKey].id) {
        res.push(this.update(data[dataKey]));
        continue;
      }
      res.push(this.save(data[dataKey]));
    }
    return forkJoin(res)
      .pipe(
        map((value: Array<any>) => {
          // return value;
          return {success: value.every(value1 => value1.success === true)}
        })
      );
  }

  public save(data) {
    return this.http.post(environment.apiUrl + this.url, data)
      .pipe(map((value: any) => {
        this.elements.push({
          ...data,
          id: value.id
        });
        return value;
      }));
  }

  public getAll() {
    this.elements$ = new Observable<Object>(subscriber => {
      if (this.elements) {
        // it's required, to work properly. I think the base concept is wrong.
        timer(0)
          .subscribe(() => {
            subscriber.next(this.elements);
            subscriber.complete();
          });
        return;
      }
      this.http.get(environment.apiUrl + this._getCollectionUrl())
        .subscribe(value => {
          this.elements = value;
          subscriber.next(this.elements);
          subscriber.complete();
        }, error => subscriber.error(error));
    });
    return this.elements$;
  }

  public update(data: any) {
    return this.http.put(environment.apiUrl + this.url + '/' + data.id, data)
      .pipe(map(value => {
        for (let elementsKey in this.elements) {
          if (this.elements[elementsKey].id === data.id) {
            this.elements[elementsKey] = data;
            break;
          }
        }
        return value;
      }));
  }

  public deleteAll(data: Array<string>) {
    let res: any = [of({success: true})];
    for (let dataKey in data) {
      res.push(this.delete(data[dataKey]));
    }
    return forkJoin(res)
      .pipe(
        map((value: Array<any>) => {
          // return value;
          return {success: value.every(value1 => value1.success === true)}
        })
      );
  }

  public delete(id: string) {
    return this.http.delete(environment.apiUrl + this.url + '/' + id)
      .pipe(map(value => {
        let tmpElements = [];
        for (let elementsKey in this.elements) {
          const element = this.elements[elementsKey];
          if (element.id === id) {
            continue;
          }
          tmpElements.push(element);
        }
        this.elements = tmpElements;
        return {success: true};
      }));
  }

  public get(id: string) {
    let req = this.getAll().pipe(map((value: any) => {
      for (let i in value) {
        if (value.hasOwnProperty(i) && value[i].id === id) {
          return value[i];
        }
      }
      return null;
    }));
    return req;
  }

  private _getCollectionUrl() {
    return this.collectionUrl || this.url + 's';
  }
}
