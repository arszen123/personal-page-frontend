import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "@environments/environment";
import {catchError, map} from "rxjs/operators";
import LocalStore from "@app/utils/store";

@Injectable({
  providedIn: 'root'
})
export class PublicProfileService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getPageData(id: string, password?: string) {
    const httpHeaders = new HttpHeaders();
    let token = btoa(`${id}:${password}`);
    if (LocalStore.has(`page_${id}`)) {
      token = LocalStore.get(`page_${id}`).token;
    }
    return this.http.get(environment.apiUrl + `page/${id}`, {
      headers: httpHeaders.set('Authorization', 'Basic ' + token)
    })
      .pipe(map(value => {
          LocalStore.set(`page_${id}`, {
            token: token,
            // expiration:
          });
          return value;
        })
      );
  }
}
