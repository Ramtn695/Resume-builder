import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  forwardRef,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextInputComponent),
      multi: true,
    },
  ],
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() fieldName!: string;
  @Input() formControl: FormControl = new FormControl();
  @Input() type!: string;
  @Input() values: string[] = [];
  @Input() myClassName: string = '';
  @Input() myStyles: any = {};
  isLoading = false;
  textType = false;
  radioType = false;
  selectType = false;
  textAreaType = false;
  securityAnswer = false;
  checkBoxType = false;

  private _value: any = ''; // Internal value
  private onChange: (value: any) => void = () => {};
  private onTouched: () => void = () => {};

  constructor() {}

  ngOnChanges() {
    this.getTypes();
  }

  getTypes() {
    if (
      ['text', 'email', 'number', 'password', 'phone', 'date'].find(
        (e) => e == this.type
      )
    ) {
      this.textType = true;
    }
    if (['radio'].find((e) => e == this.type)) {
      this.radioType = true;
    }
    if (['checkbox'].find((e) => e == this.type)) {
      this.checkBoxType = true;
    }
    if (['select'].find((e) => e == this.type)) {
      this.selectType = true;
    }
    if (['textarea'].find((e) => e == this.type)) {
      this.textAreaType = true;
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
    this.value = event.target.value;
  }

  getErrorMessage(control:FormControl,fieldName:string) {
    if(control && control.touched){
      if(control.errors['required']){
        return `${fieldName} is required and shouldn't be empty`
      }else if(control.errors['minlength']){
        return `${fieldName} must have min length ${control.errors['minlength']['requiredLength']}`
      }else if(control.errors['maxlength']){
        return `${fieldName} must have max length ${control.errors['maxlength']['requiredLength']}`
      }else if(control.errors['email']){
        return `${fieldName} must be valid email`
      }else if(control.errors['pattern']){
        return `${fieldName} must be valid`
      }else if(control.errors['min']){
        return `Must have ${control.errors['min']['min']} experience`
      }
    }
  }
  setValue(event,formControl:FormControl){
    console.log(event.target.value,'target',formControl);
    
    formControl.setValue(event.target.value)
  }
}
