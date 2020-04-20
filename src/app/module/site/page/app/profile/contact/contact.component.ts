import {AfterViewChecked, AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import Utils from "@app/utils/utils";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {form as formData} from '@assets/form';
import {ContactService} from "@app/repository/contact.service";
import {ConfirmDialogComponent} from "@app/module/site/component/confirm-dialog/confirm-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {OnBeforeDeactivate} from "@app/interface/OnBeforeDeactivate";
import {RepositoryHelper} from "@app/helper/repository-helper";
import {FormController} from "@app/interface/FormController";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnBeforeDeactivate, AfterViewInit, AfterViewChecked, FormController {
  private formData = formData.contact;
  private forms = [Utils.clone(this.formData)];
  @ViewChildren('form')
  private formQueryList: QueryList<FormBuilderComponent>;
  private repositoryHelper: RepositoryHelper;

  constructor(
    private repository: ContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {
  }

  private get isNotChangedFormsValue() {
    return typeof this.repositoryHelper === 'undefined' || !this.repositoryHelper.isFormsValueChanged;
  }

  ngAfterViewInit(): void {
    this.repositoryHelper = new RepositoryHelper(
      this.repository,
      this.formQueryList,
      this,
      this.snackBar
    );
    this.repositoryHelper.syncData();
    this.formQueryList.forEach(((item, index, array) => this.subscribeValueChanges(item, index, array)));
  }

  ngAfterViewChecked(): void {
    this.formQueryList.forEach(((item, index, array) => this.subscribeValueChanges(item, index, array)));
  }

  public onBeforeDeactivate(): boolean {
    return this.repositoryHelper.canDeactivate();
  }

  public addForm() {
    this.forms.push(Utils.clone(this.formData));
  }

  private save() {
    this.repositoryHelper.save();
  }

  private delete(id) {
    let dialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Would you like to delete?',
      }
    });
    dialog.afterClosed().subscribe(value => {
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
  }

  private subscribeValueChanges(item: FormBuilderComponent, index: number, array: FormBuilderComponent[]) {
    item.subscribeValueChanges('type', val => {
      if (val === 'other') {
        this.forms[index].elements.other_type.required = true;
        this.forms[index].elements.other_type.hidden = false;
      } else {
        this.forms[index].elements.other_type.required = false;
        this.forms[index].elements.other_type.hidden = true;
      }
    });
  }
}
