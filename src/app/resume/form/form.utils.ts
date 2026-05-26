import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomFields } from './form.fields';

@Injectable({
  providedIn: 'root',
})
export class FormUtils {
  private fb!: FormBuilder;

  createFormGroups(
    fields: CustomFields[],
    fb: FormBuilder
  ) {
    return fb.group(
      fields.reduce(
        (acc, field) => ({
          ...acc,
          [field.id]: [field.initialValue, field.validators],
        }),
        {}
      )
    );
  }
}
