import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

/**
 * @example {
 *   elements: {
 *     name: {
 *       value: value,
 *       type: 'type',
 *       validators: [validators...]
 *       errors: {
 *         validator: 'errorMessage'
 *       }
 *       ... // other properties may come
 *     }
 *   }
 * }
 */
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, DoCheck {
  @Input('data')
  public formData;

  private form: FormGroup = null;

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.buildForm(this.formData);
  }

  ngDoCheck(): void {
    if (this.form !== null) {
      for (let elementsKey in this.formData.elements) {
        if (!this.form.get(elementsKey).value) {
          this.form.get(elementsKey).setValue(this.formData.elements[elementsKey].value);
        }
      }
    }
  }

  public submit() {
    for (let controlsKey in this.form.controls) {
      this.form.controls[controlsKey].markAsTouched();
    }
  }

  public isValid() {
    return this.form.valid;
  }

  public formValue() {
    return this.form.value;
  }

  private buildForm(formData) {
    let elements = formData.elements;
    let formGroupData = {};
    for (let i in elements) {
      formGroupData[i] = [typeof elements[i]['value'] !== 'undefined' ? elements[i]['value'].data : '', elements[i]['validators']];
    }
    this.form = this.fb.group(formGroupData);
  }
}
