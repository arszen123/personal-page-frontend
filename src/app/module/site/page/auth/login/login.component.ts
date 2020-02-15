import {Component, OnInit} from '@angular/core';
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
export class LoginComponent implements OnInit {
  protected authCredential: AuthCredential = {
    email: null,
    password: null,
  };
  private loginForm;

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

  protected login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(() => {
          this.router.navigate([environment.appBaseUrl])
          },
          error => {
            // @todo handel error message
          })
    }
  }
}
