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
          this.setToken(val);
          this.isLoggedIn$.next(this.isLoggedIn());
          return this.http.get(environment.apiUrl + 'user').pipe(map(
            (user: User) => {
              this.setUser(user);
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
          this.setToken(val);
          this.setUser({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
          });
          this.isLoggedIn$.next(this.isLoggedIn());

          return val;
        }));
  }

  public updateData(userData: {email: string, password: string, newPassword?: string}) {
    return this.http.put(environment.apiUrl + 'user/profile', userData).pipe(map(
      (val: any) => {
        if (val.success) {
          const user = this.getUser();
          user.email = userData.email;
          this.setUser(user);
        }
        return val;
      }
    ));
  }

  public isTokenExpired(): boolean {
    const tokenExpiration = new Date(LocalStore.get('token_expires_at'));
    const now = new Date();
    // @TODO deal with different timezones
    return  tokenExpiration < now;
  }

  private setUser(user: User) {
    LocalStore.set('user', user);
  }

  private setToken(tokenResponse: TokenResponse) {
    LocalStore.set('token', tokenResponse.token);
    LocalStore.set('token_expires_at', tokenResponse.expires_at);
  }
}
