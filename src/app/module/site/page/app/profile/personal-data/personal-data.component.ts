import {Component, OnInit, ViewChild} from '@angular/core';
import {PersonalDataService} from "@app/repository/personal-data.service";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {MatSnackBar} from "@angular/material";
import {form as formData} from "@assets/form";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnInit {
  private formData: any = formData.personal_data;
  @ViewChild('form', {static: false})
  private form: FormBuilderComponent;
  private showErrorMessage: boolean = false;

  constructor(
    private repository: PersonalDataService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.repository.getPersonalData().subscribe(value => {
      let tmp = this.formData;
      for (let i in value) {
        if (typeof tmp.elements[i] !== 'undefined') {
          tmp.elements[i].value = value[i];
        }
      }
      this.formData = tmp;
    });
  }

  private save() {
    this.form.submit();
    if (this.form.isValid()) {
      this.repository.save(this.form.formValue())
        .subscribe(val => {
            //@ts-ignore
            if (val.success) {
              this.snackBar.open('Success!', 'OK', {duration: 2000});
            }
          },
          error => {
            this.snackBar.open(error.error.message, 'OK', {duration: 2000});
          })
    }
  }
}
