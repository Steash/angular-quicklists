import { KeyValuePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-modal',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './form-modal.component.html',
  styles: ``
})
export class FormModalComponent {
  formGroup = input.required<FormGroup>()
  title = input.required<String>()

  save = output()
  close = output()
}
