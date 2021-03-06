import {Repository} from "@app/interface/Repository";
import {QueryList} from "@angular/core";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import {map} from "rxjs/operators";
import {FormController} from "@app/interface/FormController";
import {MatSnackBar} from "@angular/material";
import {forkJoin} from "rxjs";

export class RepositoryHelper {
  private deletedIds: Array<string> = [];

  constructor(
    private repository: Repository,
    private forms: QueryList<FormBuilderComponent>,
    private controller: FormController,
    private snackBar: MatSnackBar
  ) {
  }

  public get isFormsValueChanged() {
    let res = this.deletedIds.length !== 0;
    this.forms.forEach(item => res = res || item.isValueChanged());
    return res;
  }

  public syncData() {
    this.repository.getAll()
      .subscribe((val: Array<object>) => {
        let formsNeeded = val.length - this.forms.length;
        for (let i = 0; i < formsNeeded; i++) {
          this.controller.addForm();
        }

        setTimeout(() => {
          let form = this.forms.toArray();
          for (let i in val) {
            form[i].setDefaultValue(val[i]);
          }
        });
      });
  }

  public canDeactivate() {
    let isValueChanged = this.isFormsValueChanged;
    if (isValueChanged) {
      isValueChanged = !confirm('You have unsaved modifications!\nYou really want to unload the page?');
    }
    return !isValueChanged;
  }

  public save() {
    let items = [];
    let isValid = true;
    this.forms.forEach((item) => {
      item.submit();
      if (item.isValid()) {
        let data = item.getValue();
        items.push(data);
        return;
      }
      isValid = false;
    });
    if (isValid) {
      const delete$ = this.repository.deleteAll(this.deletedIds);
      const save$ = this.repository.saveAll(items);

      forkJoin(
        delete$,
        save$
      )
        .pipe(
          map((value: Array<any>) => {
            return {success: value.every(value1 => value1.success && true)}
          })
        )
        .subscribe(val => {
            if (val.success) {
              this.snackBar.open('Success!', 'OK', {duration: 2000});
              this.syncData();
            } else {
              this.snackBar.open('Something went wrong!', 'OK', {duration: 2000});
            }
          },
          err => {
            this.snackBar.open(err.error.message, 'OK', {duration: 2000});
          });
    }
  }

  public delete(id) {
    let dbId = this.forms.toArray()[id].getValue()['id'];
    if (dbId) {
      this.deletedIds.push(dbId);
    }
  }
}
