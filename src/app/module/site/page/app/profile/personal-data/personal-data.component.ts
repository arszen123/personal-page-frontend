import {Component, ViewChild} from '@angular/core';
import {PersonalDataService} from "@app/repository/personal-data.service";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {MatSnackBar} from "@angular/material";
import {form as formData} from "@assets/form";
import {OnBeforeDeactivate} from "@app/interface/OnBeforeDeactivate";

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.scss']
})
export class PersonalDataComponent implements OnBeforeDeactivate {
  public formData: any = formData.personal_data;
  @ViewChild('form', {static: false})
  private form: FormBuilderComponent;

  constructor(
    private repository: PersonalDataService,
    private snackBar: MatSnackBar
  ) {
  }

  public get isNotChangedFormsValue() {
    return false; //@todo implement
  }

  ngOnInit() {
    this.repository.getAll().subscribe(value => this.form.setDefaultValue(value));
  }

  public onBeforeDeactivate(): boolean {
    let isValueChanged = this.form.isValueChanged();
    if (isValueChanged) {
      isValueChanged = !confirm('You have unsaved modifications!\nYou really want to unload the page?');
    }
    return !isValueChanged;
  }

  public save() {
    this.form.submit();
    if (this.form.isValid()) {
      this.repository.save(this.form.getValue())
        .subscribe((val: any) => {
            if (val.success) {
              this.snackBar.open('Success!', 'OK', {duration: 2000});
              this.form.markValueUnChanged();
            }
          },
          error => {
            console.log(error);
            if (error.error.message) {
              this.snackBar.open(error.error.message, 'OK', {duration: 2000});
            }
          })
    }
  }
}
