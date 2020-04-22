import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "@app/service/auth.service";
import {form as formData} from '@assets/form';
import Utils from "@app/utils/utils";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-profile-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements AfterViewInit {
  private formData = Utils.clone(formData.profile_settings);
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

  private deleteProfile() {
    const isDelete = confirm("Are you sure you wan't to delete your account?");
    if (isDelete) {
      this.authService.deleteUser().subscribe((value: any) => {
        if (value.success) {
          this.snackBar.open('A confirmation email was sent!', 'OK', {duration: 2000});
        }
      }, error => {
        this.snackBar.open(error.error.message, 'OK', {duration: 2000});
      })
    }
  }
}
