import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn:'root'
})
@Pipe({
  name: 'camelToTitle',
})
export class CamelToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; // Return the value if it's empty or undefined

    // Format camelCase to "Title Case"
    return value
      .replace(/([A-Z])/g, ' $1') // Add spaces before uppercase letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  }
}
