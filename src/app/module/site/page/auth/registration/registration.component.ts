import {Component, OnInit} from '@angular/core';
import {AuthService} from "@app-service/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {environment} from "@environments/environment";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  private registrationForm;

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

  public register() {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value)
        .subscribe(() => {
            this.router.navigate([environment.appBaseUrl])
          },
          error => {
            // @todo handel error message
          });
    }
  }

  private passwordCheck(group: FormGroup) {
    let pass = group.get('password').value;
    let confirmPass = group.get('passwordConfirmation').value;

    return pass === confirmPass ? null : {notSame: true};
  }
}
