import {Injectable} from '@angular/core';
import {AuthCredential} from '@app-interface/AuthCredential';
import {HttpClient} from '@angular/common/http';
import {concatAll, map} from "rxjs/operators";
import LocalStore from "@app-utils/store";
import {BehaviorSubject, Observable, of} from "rxjs";
import {User} from "@app-interface/User";
import {environment} from '@environments/environment';
import {UserRegistration} from "@app/interface/UserRegistration";
import {TokenResponse} from "@app/interface/TokenResponse";

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
      if (this.isTokenExpired()) {
        this.logout();
        return;
      }
      return of(LocalStore.get('user'));
    }
    return <Observable<User>>this.http.post(environment.apiUrl + 'authentication/login', auth)
      .pipe(
        map((val: TokenResponse) => {
          LocalStore.set('token', val.token);
          LocalStore.set('token_expires_at', val.expires_at);
          this.isLoggedIn$.next(this.isLoggedIn());
          return this.http.get(environment.apiUrl + 'user').pipe(map(
            (user: User) => {
              LocalStore.set('user', user);
              return user;
            }
          ));
        }),
        concatAll()
      );
  }

  public getUser(): User {
    return LocalStore.get('user');
  }

  public logout() {
    LocalStore.remove('user');
    LocalStore.remove('token');
    LocalStore.remove('token_expires_at');
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

  public register(user: UserRegistration) {
    return this.http.post(environment.apiUrl + 'user', user).pipe(map(
        (val: TokenResponse) => {
          LocalStore.set('token', val.token);
          LocalStore.set('token_expires_at', val.expires_at);
          LocalStore.set('user', {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          });
          this.isLoggedIn$.next(this.isLoggedIn());

          return val;
        }));
  }

  public isTokenExpired(): boolean {
    const tokenExpiration = new Date(LocalStore.get('token_expires_at'));
    const now = new Date();
    // @TODO deal with different timezones
    return  tokenExpiration < now;
  }
}
