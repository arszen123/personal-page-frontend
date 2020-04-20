import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "@app/service/auth.service";
import {form as formData} from '@assets/form';
import Utils from "@app/utils/utils";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit {
  private formData = Utils.clone(formData.profile);
  @ViewChild('form', {static: true})
  private form: FormBuilderComponent;

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {
  }

  private get isNotChangedFormsValue() {
    return !this.form.isValueChanged();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.setFormData();
    });
  }

  private save() {
    this.form.submit();
    if (this.form.isValid()) {
      const data = this.form.getValue();
      if (!data.newPassword) {
        delete data.newPassword;
      }
      this.authService.updateData(data).subscribe((value: any) => {
        if (value.success) {
          this.snackBar.open('Success!', 'OK', {duration: 2000});
          this.setFormData();
        }
      }, error => {
        this.snackBar.open(error.error.message, 'OK', {duration: 2000});
      })
    }
  }

  private setFormData() {
    this.form.setDefaultValue({
      email: this.authService.getUser().email,
      password: '',
      newPassword: '',
    });
  }
}
