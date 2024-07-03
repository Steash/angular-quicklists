import { Component, effect, inject, signal } from '@angular/core';
import { ModalComponent } from '../shared/ui/modal.component';
import { Checklist } from '../shared/interfaces/checklist';
import { FormBuilder } from '@angular/forms';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [ModalComponent, FormModalComponent],
})
export default class HomeComponent {
  formBuilder = inject(FormBuilder)

  checklistBeingEdited = signal<Partial<Checklist> | null>(null)

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
  })

  constructor() {
    effect(() => {
      const checklist = this.checklistBeingEdited()

      if(!checklist) {
        this.checklistForm.reset()
      }
    })
  }
}
