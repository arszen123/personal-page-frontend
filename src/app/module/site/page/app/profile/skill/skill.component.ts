import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {form as formData} from '@assets/form';
import {SkillService} from "@app/repository/skill.service";
import {MatSnackBar} from "@angular/material";
import {OnBeforeDeactivate} from "@app/interface/OnBeforeDeactivate";
import Utils from "@app/utils/utils";

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit, OnBeforeDeactivate {
  public formData = formData.skill;
  @ViewChild('form', {static: true})
  private form: FormBuilderComponent;
  private originalData: any;

  constructor(
    private repository: SkillService,
    private snackBar: MatSnackBar,
  ) {
  }

  public get isNotChangedFormsValue() {
    return !this.isValueChanged();
  }

  ngOnInit() {
    this.repository.getAll().subscribe((val) => {
      this.originalData = Utils.clone({skill: val});
      this.form.setDefaultValue(Utils.clone({skill: val}))
    });
  }

  public onBeforeDeactivate(): boolean {
    let isValueChanged = this.isValueChanged();
    if (isValueChanged) {
      isValueChanged = !confirm('You have unsaved modifications!\nYou really want to unload the page?');
    }
    return !isValueChanged;
  }

  public save() {
    this.form.submit();
    if (this.form.isValid()) {
      let skills = this.form.getValue();
      this.repository
        .save(skills)
        .subscribe((val: any) => {
            if (!val.success) {
              return;
            }
            this.originalData = Utils.clone(skills);
            this.form.setDefaultValue(skills);
            this.snackBar.open('Success!', 'Ok!', {duration: 2000});
          },
          err => this.snackBar.open(err.errormessage, 'Ok!', {duration: 2000})
        );
    }
  }

  private isValueChanged(): boolean {
    return JSON.stringify(this.form.getValue()) !== JSON.stringify(this.originalData);
  }
}
