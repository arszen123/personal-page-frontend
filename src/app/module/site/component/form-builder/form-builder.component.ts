import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable, Subscription, timer} from "rxjs";

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
 *   },
 *   order: [
 *     'element_name', ...
 *   ]
 * }
 * @todo compute change set
 */
@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {
  @Input('data')
  public formData;

  private form: FormGroup = null;
  private valueChange = {};
  private _isValueChanged: boolean = false;
  private _defaultValue: any = {};
  private _valueChange: Subscription;
  private files: Object = {};
  private filesPreview: Object = {};

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.buildForm(this.formData);
    this._valueChange = this.form.valueChanges.subscribe((val) => {
      this._isValueChanged = JSON.stringify(val) !== JSON.stringify(this._defaultValue);
    });
  }

  public submit() {
    for (let controlsKey in this.form.controls) {
      this.form.controls[controlsKey].markAsTouched();
    }
  }

  public isValid() {
    return this.form.valid;
  }

  public getValue() {
    const value = this.form.value;
    for (let filesKey in this.files) {
      if (this.files.hasOwnProperty(filesKey)) {
        value[filesKey] = this.files[filesKey];
        if (value[filesKey] === '' && this.filesPreview[filesKey] === null) {
          value[filesKey] = null;
        }
      }
    }
    return value;
  }

  public isValueChanged() {
    return this._isValueChanged;
  }

  public markValueUnChanged() {
    this._isValueChanged = false;
  }

  public subscribeValueChanges(element, call) {
    if (typeof this.valueChange[element] === 'undefined') {
      this.valueChange[element] = this.form.get(element).valueChanges.subscribe(call);
    }
  }

  public setDefaultValue(value: { [key: string]: any; }, options: { onlySelf?: boolean, emitEvent?: boolean } = {
    onlySelf: true,
    emitEvent: true
  }) {
    this.setValue(value, {...options, default: true});
  }

  public setValue(value: { [key: string]: any; }, options: { default?: boolean, onlySelf?: boolean, emitEvent?: boolean } = {
    default: false,
    onlySelf: true,
    emitEvent: true
  }) {
    let newValue = {};
    for (let i in this.form.controls) {
      const isPictureUploadElement = this.formData.elements[i].type === 'picture_upload';
      newValue[i] = this.form.controls[i].value;
      if (typeof value[i] !== 'undefined' && !isPictureUploadElement) {
        newValue[i] = value[i];
      }
      if (isPictureUploadElement) {
        this.filesPreview[i] = value[i];
      }
    }
    // @todo there should be a better option
    this.form.setValue(newValue, {onlySelf: options.onlySelf, emitEvent: options.emitEvent});
    if (options.default) {
      this._defaultValue = this.getValue();
      this.form.setValue(newValue, {onlySelf: options.onlySelf, emitEvent: true});
    }
  }

  ngOnDestroy(): void {
    for (let valueChangeKey in this.valueChange) {
      this.valueChange[valueChangeKey].unsubscribe();
    }
    this._valueChange.unsubscribe();
  }

  private buildForm(formData) {
    let elements = formData.elements;
    let formGroupData = {};
    for (let i in elements) {
      let value = typeof elements[i]['value'] !== 'undefined' ? elements[i]['value'].data : '';
      formGroupData[i] = [
        value,
        elements[i]['validators'],
        elements[i]['validators_async']
      ];
    }
    this.form = this.fb.group(formGroupData);
  }

  private onFileChanged(element: string, imageElement: HTMLInputElement) {
    this.getImageBase64Data(imageElement)
      .subscribe(value => {
        this.files[element] = value;
      })
  }

  private setImage(imageElement: HTMLInputElement, previewElement: HTMLImageElement) {
    this.getImageBase64Data(imageElement)
      .subscribe((value: any) => {
        if (value === '') {
          value = previewElement.dataset.src;
        }
        previewElement.src = value;
      });
  }

  private getImageBase64Data(element: HTMLInputElement) {
    return new Observable(subscriber => {
      const image = element.files[0];
      if (!image) {
        timer(0)
          .subscribe(() => {
            subscriber.next('');
            subscriber.complete();
          });
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.addEventListener('load', (ev: any) => {
        subscriber.next(ev.target.result);
        subscriber.complete();
      });
      reader.addEventListener('error', (err) => {
        subscriber.error(err);
      })
    });
  }
}
