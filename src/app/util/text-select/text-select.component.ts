import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  forwardRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CamelToTitlePipe } from '../camel-to-title.pipe';

@Component({
  selector: 'app-text-select',
  templateUrl: './text-select.component.html',
  styleUrls: ['./text-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextSelectComponent),
      multi: true,
    },
    CamelToTitlePipe
  ],
})
export class TextSelectComponent implements ControlValueAccessor {
  @Input() fieldName: string;
  @Input() formControl: FormControl;
  @Input() type: string;
  @Input() values!: string[];
  @Input() isMultiple!: boolean;
  isLoading = false;
  @Output() setSelected = new EventEmitter();

  private _value: any = []; // Internal value
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {}

  ngOnChanges() {
    if(!this.isMultiple){
      this.isMultiple = false
    }
  }

  writeValue(value: any): void {
    if (value !== undefined) {
      this._value = value;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  set value(value: any) {
    this._value = value;
    this.onChange(value);
  }

  get value(): any {
    return this._value;
  }

  onInputChange(event: any): void {
    let selectElement = event.target as HTMLSelectElement;
    if (
      selectElement.selectedOptions.length &&
      selectElement.selectedOptions.length > 0
    ) {
      let selectedValues = Array.from(selectElement.selectedOptions).map(
        (option) => option.value
      );
      // Update FormControl via ControlValueAccessor (single value for non-multiple)
      const formValue = this.isMultiple ? selectedValues : (selectedValues[0] || '');
      this._value = formValue;
      this.onChange(formValue);
      this.setSelected.emit(selectedValues);
    } else {
      const val = event.target.value;
      this._value = val;
      this.onChange(val);
      this.setSelected.emit(val);
    }
  }
}
