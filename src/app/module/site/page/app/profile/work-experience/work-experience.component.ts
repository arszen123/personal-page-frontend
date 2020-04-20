import {AfterViewChecked, AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import {form as formData} from "@assets/form";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import Utils from "@app/utils/utils";
import {WorkExperienceService} from "@app/repository/work-experience.service";
import {MatDialog, MatSnackBar} from "@angular/material";
import {ConfirmDialogComponent} from "@app/module/site/component/confirm-dialog/confirm-dialog.component";
import {OnBeforeDeactivate} from "@app/interface/OnBeforeDeactivate";
import {RepositoryHelper} from "@app/helper/repository-helper";
import {FormController} from "@app/interface/FormController";

@Component({
  selector: 'app-work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent implements AfterViewInit, AfterViewChecked, OnBeforeDeactivate, FormController {
  private formData = formData.experience;
  private forms = [Utils.clone(formData.experience)];
  @ViewChildren('form')
  private formQueryList: QueryList<FormBuilderComponent>;
  private repositoryHelper: RepositoryHelper;

  constructor(
    private repository: WorkExperienceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
  }

  private get isNotChangedFormsValue() {
    return typeof this.repositoryHelper === 'undefined' || !this.repositoryHelper.isFormsValueChanged;
  }

  public save() {
    return this.repositoryHelper.save();
  }

  public addForm() {
    this.forms.push(Utils.clone(this.formData));
  }

  ngAfterViewInit(): void {
    if (typeof this.repositoryHelper === 'undefined') {
      this.repositoryHelper = new RepositoryHelper(
        this.repository,
        this.formQueryList,
        this,
        this.snackBar,
      );
    }
    this.repositoryHelper.syncData();
    console.log(this.formQueryList);
    this.formQueryList.forEach(((item, index, array) => this.subscribeValueChanges(item, index, array)));
  }

  ngAfterViewChecked(): void {
    this.formQueryList.forEach(((item, index, array) => this.subscribeValueChanges(item, index, array)));
  }

  delete(id) {
    this.openDialog('Would you like to delete?', value => {
      if (value !== true) {
        return;
      }
      let forms = [];
      for (let i = 0; i < this.forms.length; i++) {
        if (i !== id) {
          forms.push(this.forms[i]);
        }
      }
      this.repositoryHelper.delete(id);
      this.forms = forms;
    });
    return;
  }

  public onBeforeDeactivate(): boolean {
    return this.repositoryHelper.canDeactivate();
  }

  private subscribeValueChanges(item, index, array) {
    item.subscribeValueChanges('is_current', (val) => {
      if (val) {
        this.forms[index].elements.to.required = false;
        this.forms[index].elements.to.hidden = true;
        return;
      }
      if (this.forms[index].elements.to.hidden) {
        this.forms[index].elements.to.hidden = false;
        this.forms[index].elements.to.required = true;
      }
    });
  }

  private openDialog(message: string, fn: (value: boolean) => void) {
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: message,
      }
    });
    dialog.afterClosed().subscribe(fn);
  }
}
