import { Component, OnInit } from '@angular/core';
import { SchemaService } from './schema.service';

@Component({
  selector: 'app-form-layout',
  templateUrl: './form-layout.component.html',
  styleUrls: ['./form-layout.component.scss']
})
export class FormLayoutComponent implements OnInit {

  useStepper = true;
  schema: any;

  constructor(private schemaService: SchemaService) {}
  ngOnInit(): void {
    this.schema = this.schemaService.getSchema();
  }
  onSubmit(payload: any) {
    console.log('Received payload', payload);
    // send to API or process as needed
  }

}
