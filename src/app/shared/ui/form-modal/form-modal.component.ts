import { CommonModule, KeyValuePipe, SlicePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe, CommonModule, SlicePipe],
  templateUrl: './form-modal.component.html',
  styles: ``
})
export class FormModalComponent {
  formGroup = input.required<FormGroup>()
  title = input.required<String>()

  save = output()
  close = output()

  // Define the mapping of control keys to input types
  inputTypes: { [key: string]: string } = {
    title: 'text',
    description: 'text',
    endDate: 'date',
  };

  trackByControlKey(index: number, control: { key: string, value: any }): string {
    return control.key;
  }

  // Determine the input type for a given control key
  getInputType(controlKey: string): string {
    return this.inputTypes[controlKey] || 'text';
  }
}
