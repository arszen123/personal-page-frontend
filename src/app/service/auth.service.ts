import {Injectable} from '@angular/core';
import {AuthCredential} from '../inteface/AuthCredential';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(auth: AuthCredential) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    };
    this.http.post('http://127.0.0.1:8080/authentication/login', auth, httpOptions)
      .subscribe(
        (val) => {
          console.log("POST call successful value returned in body",
            val);
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });
    ;
  }

  public logout() {

  }

  public isLoggedIn(): boolean {

    return false;
  }
}
