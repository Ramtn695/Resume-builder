import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from './text-input/text-input.component';
import { TextSelectComponent } from './text-select/text-select.component';
import { CamelToTitlePipe } from './camel-to-title.pipe';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [TextInputComponent, TextSelectComponent,CamelToTitlePipe],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports:[TextInputComponent,TextSelectComponent]
})
export class UtilModule { }
