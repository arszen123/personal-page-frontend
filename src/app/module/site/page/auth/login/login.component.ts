import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AuthCredential} from "@app-interface/AuthCredential";
import {AuthService} from "@app-service/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  protected authCredential: AuthCredential = {
    email: null,
    password: null,
  };
  public loginForm;
  public error;
  private subSubscription$ = null;
  @Input()
  private doRedirect: boolean = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnDestroy(): void {
    this.unsubscribeLogin();
  }

  private unsubscribeLogin()
  {
    if (this.subSubscription$ !== null) {
      this.subSubscription$.unsubscribe();
      this.subSubscription$ = null;
    }
  }

  public login() {
    this.unsubscribeLogin();
    if (this.loginForm.valid) {
      this.subSubscription$ = this.authService.login(this.loginForm.value)
        .subscribe(() => {
          if (this.doRedirect) {
            this.router.navigate([environment.appBaseUrl]);
            return;
          }
          window.location.href = window.location.href;
          },
          error => {
            this.error = error.error;
          })
    }
  }
}
