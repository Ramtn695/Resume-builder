import { Injectable } from '@angular/core';
import myData from '../../../assets/schema.json';

@Injectable({
  providedIn: 'root',
})
export class SchemaService {
  public schema: any = myData;

  getSchema() {
    return this.schema;
  }
}
