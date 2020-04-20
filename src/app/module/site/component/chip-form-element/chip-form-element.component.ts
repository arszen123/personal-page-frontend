import {Component, ElementRef, forwardRef, HostBinding, Injector, Input, OnDestroy, OnInit} from '@angular/core';
import {MatChipInputEvent, MatFormFieldControl} from "@angular/material";
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from "@angular/forms";
import {Subject} from "rxjs";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import Utils from "@app/utils/utils";
import {FocusMonitor} from "@angular/cdk/a11y";

export class Chip {
  constructor(public value: string) {
  }
}

@Component({
  selector: 'app-chip-form-element',
  templateUrl: './chip-form-element.component.html',
  styleUrls: ['./chip-form-element.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ChipFormElementComponent
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChipFormElementComponent),
      multi: true,
    },
  ],
  host: {
    '[class.floating]': 'shouldLabelFloat',
  }
})
export class ChipFormElementComponent implements OnInit, OnDestroy, MatFormFieldControl<string[]>, ControlValueAccessor {
  static nextId = 0;
  @HostBinding()
  readonly id = `chip-form-element-${ChipFormElementComponent.nextId++}`;
  readonly required: boolean;
  readonly stateChanges = new Subject<void>();
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  readonly autofilled: boolean;
  readonly controlType: string;
  readonly disabled: boolean;
  readonly empty: boolean;
  readonly errorState: boolean;
  public focused: boolean = false;
  private visible = true;
  private selectable = true;
  private removable = true;
  private addOnBlur = true;
  private elements: Array<string> = [];
  public ngControl: NgControl | null;
  private _placeholder: string = '';
  private onChange = (delta: any) => {};
  private onTouched = () => {};

  constructor(
    private injector: Injector,
    private _focusMonitor: FocusMonitor,
    private _elementRef: ElementRef<HTMLElement>
  ) {
  }

  @Input()
  get placeholder() {
    return this._placeholder;
  }

  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get shouldLabelFloat() {
    return this.focused || !this.empty;
  }

  get value() {
    return this.elements;
  }

  set value(elements: Array<string> | null) {
    this.elements = elements;
    this.stateChanges.next();
    this.onChange(this.elements);
  }

  ngOnInit() {
    this._focusMonitor.monitor(this._elementRef, true).subscribe(origin => {
      if (this.focused && !origin) {
        this.onTouched();
      }
      this.focused = !!origin;
      this.stateChanges.next();
    });

    this.ngControl = this.injector.get(NgControl);
    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.elements.push(value.trim());
      this.elements = Utils.unique(this.elements);
      this.value = this.elements;
    }

    if (input) {
      input.value = '';
    }
  }

  remove(element: string): void {
    const index = this.elements.indexOf(element);

    if (index >= 0) {
      this.elements.splice(index, 1);
    }
    this.value = this.elements;
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  writeValue(obj: any): void {
    this.value = obj || [];
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
  }

  onContainerClick(event: MouseEvent): void {
    if ((event.target as Element).tagName.toLowerCase() != 'input') {
      this._elementRef.nativeElement.querySelector('input')!.focus();
    }
  }

  setDescribedByIds(ids: string[]): void {
  }

}
