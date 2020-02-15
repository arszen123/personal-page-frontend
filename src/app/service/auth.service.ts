import {Injectable} from '@angular/core';
import {AuthCredential} from '@app-interface/AuthCredential';
import {HttpClient} from '@angular/common/http';
import {concatAll, map} from "rxjs/operators";
import LocalStore from "@app-utils/store";
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "@app-interface/User";
import {environment} from '@environments/environment';
import {UserRegistration} from "@app/interface/UserRegistration";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.isLoggedIn$.next(this.isLoggedIn());
  }

  public login(auth: AuthCredential): Observable<User> {
    if (LocalStore.has('user')) {
      return of(LocalStore.get('user'));
    }
    let req = this.http.post(environment.apiUrl + 'authentication/login', auth)
      .pipe(
        map(val => {
          // @ts-ignore
          LocalStore.set('token', val.token);
          return this.http.get('http://127.0.0.1:8080/user');
        }),
        concatAll()
      );
    req.subscribe(
      (val) => {
        LocalStore.set('user', val);
        this.isLoggedIn$.next(this.isLoggedIn());
      });
    // @ts-ignore
    return req;
  }

  public getUser(): User {
    return LocalStore.get('user');
  }

  public logout() {
    LocalStore.remove('user');
    LocalStore.remove('token');
    this.isLoggedIn$.next(this.isLoggedIn());
  }

  public isLoggedIn(): boolean {
    return LocalStore.has('user');
  }

  public isLoggedInO() {
    return this.isLoggedIn$;
  }

  public getToken(): string {
    return LocalStore.get('token');
  }

  register(user: UserRegistration) {
    let req = this.http.post(environment.apiUrl + 'user', user);
    req.subscribe(
      (val) => {
        // @ts-ignore
        LocalStore.set('token', val.token);
        LocalStore.set('user', {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
        });
        this.isLoggedIn$.next(this.isLoggedIn());
      });
    return req;
  }
}
