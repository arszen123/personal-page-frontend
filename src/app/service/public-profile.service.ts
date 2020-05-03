import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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
    const token = this._getToken(id, password);
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

  public downloadCV(id: string, password?: string) {
    const httpHeaders = new HttpHeaders();
    const token = this._getToken(id, password);
    return this.http.get(environment.apiUrl + `page/${id}/download`, {
      headers: httpHeaders.set('Authorization', 'Basic ' + token).set('Accept', 'application/json application/pdf'),
      responseType: 'blob',
      observe: 'response',
    }).pipe(map((response: HttpResponse<any>) => {
      const contentDisposition = response.headers.get('Content-Disposition');
      let filename = null;
      if (contentDisposition !== null) {
        filename = contentDisposition.split('=').pop();
      }
      return {
        filename: filename,
        data: response.body,
      }
    }));
  }
  private _getToken(id: string, password?: string): string {
    if (LocalStore.has(`page_${id}`)) {
      return LocalStore.get(`page_${id}`).token;
    }
    return btoa(`${id}:${password}`);
  }
}
