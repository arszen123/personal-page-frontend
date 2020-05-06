import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {form as formData} from "@assets/form";
import {MAT_DIALOG_DATA} from "@angular/material";
import {HttpClient} from "@angular/common/http";
import {environment} from "@environments/environment";
import {catchError, map} from "rxjs/operators";
import {of} from "rxjs";
import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {FormBuilderComponent} from "@app/module/site/component/form-builder/form-builder.component";
import Utils from "@app/utils/utils";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit, AfterViewInit {
  public formData = Utils.clone(formData.page_settings);
  @ViewChild('form', {static: true})
  private form: FormBuilderComponent;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private http: HttpClient,
  ) {
    this.formData.elements.page_id.validators_async.push(
      this._getValidator()
    );
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.form.subscribeValueChanges('security_level', (val) => {
      if (val === 'protected') {
        this.formData.elements.password.hidden = false;
        this.formData.elements.password.required = true;
        return;
      }
      this.formData.elements.password.required = false;
      this.formData.elements.password.hidden = true;
    });
    setTimeout(() => this.form.setDefaultValue(this.data));
  }

  public isFormValid() {
    this.form.submit();
    return this.form.isValid();
  }

  public getValue() {
    return this.form.getValue();
  }

  private _getValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return this.http.get(environment.apiUrl + `page/${control.value}/exists`).pipe(
        map((val: any) => {
          return val.exists ? {uniquePageId: true} : null
        }),
        catchError(() => of(null))
      );
    }
  }
}
