import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "@app-service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {environment} from "@environments/environment";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  private registrationForm;
  private error;
  private regSubscription$: Subscription|null = null;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: ['', Validators.required,],
    }, {validator: this.passwordCheck})
  }

  ngOnDestroy(): void {
    this.unsubscribeReg();
  }

  private unsubscribeReg()
  {
    if (this.regSubscription$ !== null) {
      this.regSubscription$.unsubscribe();
      this.regSubscription$ = null;
    }
  }

  public register() {
    this.unsubscribeReg();
    if (this.registrationForm.valid) {
      this.regSubscription$ = this.authService
        .register(this.registrationForm.value)
        .subscribe((val) => {
          console.log(val);
            this.router.navigate([environment.appBaseUrl])
          },
          error => {
            this.error = error.error;
            console.log(error);
          });
    }
  }

  private passwordCheck(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirmation').value;

    return pass === confirmPass ? null : {notSame: true};
  }
}
