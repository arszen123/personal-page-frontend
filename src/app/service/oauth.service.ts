import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {AuthService} from "@app/service/auth.service";
import {Observable} from "rxjs";
import {OauthClient} from "@app/interface/OauthClient";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(
    private http: HttpClient,
    private auth: AuthService,
  ) {
  }

  public checkClient(data) {
    let url = 'oauth/check-validity';
    if (!this.auth.isLoggedIn()) {
      url = 'oauth/check-validity-unauthorized';
    }
    return this.http.post(environment.apiUrl + url, {
      response_type: data.response_type || 'code',
      client_id: data.client_id,
      redirect_uri: data.redirect_uri,
      scope: data.scope,
    });
  }

  public authorize(data) {
    return this.http.post(environment.apiUrl + 'oauth/authorize', {
      response_type: data.response_type || 'code',
      client_id: data.client_id,
      redirect_uri: data.redirect_uri,
      scope: data.scope,
    });
  }

  public getApps(): Observable<Array<OauthClient>> {
    return this.http.get(environment.apiUrl + 'oauth/apps').pipe(map((value:any) => value.apps));
  }

  public deleteApp(clientId: string) {
    return this.http.delete(environment.apiUrl + `oauth/app/${clientId}`);
  }
}
