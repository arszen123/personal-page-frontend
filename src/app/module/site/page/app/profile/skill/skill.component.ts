import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {form as formData} from '@assets/form';
import {SkillService} from "@app/repository/skill.service";
import {MatSnackBar} from "@angular/material";
import {OnBeforeDeactivate} from "@app/interface/OnBeforeDeactivate";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit, OnBeforeDeactivate {
  private formData = formData.skill;
  @ViewChild('form', {static: true})
  private form: FormBuilderComponent;

  constructor(
    private repository: SkillService,
    private snackBar: MatSnackBar,
  ) {
  }

  private get isNotChangedFormsValue() {
    return false; //@todo implement
  }

  ngOnInit() {
    let req = this.repository.getAll();
    req.subscribe((val) => this.form.setDefaultValue({skill: val}));
  }

  public onBeforeDeactivate(): boolean {
    let isValueChanged = this.form.isValueChanged();
    if (isValueChanged) {
      isValueChanged = !confirm('You have unsaved modifications!\nYou really want to unload the page?');
    }
    return !isValueChanged;
  }

  private save() {
    this.form.submit();
    if (this.form.isValid()) {
      this.repository
        .save(this.form.getValue())
        .subscribe((val: any) => {
            if (!val.success) {
              return;
            }
            this.snackBar.open('Success!', 'Ok!', {duration: 2000});
          },
          err => this.snackBar.open(err.errormessage, 'Ok!', {duration: 2000})
        );
    }
  }
}
