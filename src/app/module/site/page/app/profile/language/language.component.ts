import {AfterViewInit, Component, QueryList, ViewChildren} from '@angular/core';
import Utils from "@app/utils/utils";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {form as formData} from '@assets/form';
import {LanguageService as LanguageRepository} from "@app/repository/language.service";
import {LanguageService} from "@app/service/language.service";
import {ConfirmDialogComponent} from "@app/module/site/component/confirm-dialog/confirm-dialog.component";
import {MatDialog, MatSnackBar} from "@angular/material";
import {OnBeforeDeactivate} from "@app/interface/OnBeforeDeactivate";
import {RepositoryHelper} from "@app/helper/repository-helper";
import {FormController} from "@app/interface/FormController";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnBeforeDeactivate, AfterViewInit, FormController {
  private formData = formData.language;
  public forms = [];
  @ViewChildren('form')
  private formQueryList: QueryList<FormBuilderComponent>;
  private repositoryHelper: RepositoryHelper;

  constructor(
    private repository: LanguageRepository,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private languages: LanguageService
  ) {
    this.formData.elements.lang_id.options = this.languages.getLanguages();
    this.forms.push(Utils.clone(this.formData));
  }

  public get isNotChangedFormsValue() {
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
  }

  public onBeforeDeactivate(): boolean {
    return this.repositoryHelper.canDeactivate();
  }

  public addForm() {
    this.forms.push(Utils.clone(this.formData));
  }

  public save() {
    this.repositoryHelper.save();
  }

  public delete(id) {
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
}
