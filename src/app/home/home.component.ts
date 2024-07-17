import { Component, effect, inject, signal } from '@angular/core';
import { ModalComponent } from '../shared/ui/modal.component';
import { Checklist } from '../shared/interfaces/checklist';
import { FormBuilder } from '@angular/forms';
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component';
import { ChecklistService } from '../shared/data-access/checklist.service';
import { ChecklistListComponent } from './ui/checklist-list/checklist-list.component';
import { NavbarComponent } from '../shared/ui/navbar/navbar.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [ModalComponent, FormModalComponent, ChecklistListComponent, NavbarComponent],
})
export class HomeComponent {
  formBuilder = inject(FormBuilder)
  checklistService = inject(ChecklistService)

  checklistBeingEdited = signal<Partial<Checklist> | null>(null)

  checklistForm = this.formBuilder.nonNullable.group({
    title: [''],
    description: [''],
    endDate: [null as Date | null],
  })

  constructor() {
    effect(() => {
      const checklist = this.checklistBeingEdited()

      if (!checklist) {
        this.checklistForm.reset()
      } else {
        this.checklistForm.patchValue({
          title: checklist.title,
          description: checklist.description || '',
          endDate: checklist.endDate ? new Date(checklist.endDate) : null
        })
      }
    })
  }

  onSave() {
    const checklist = this.checklistBeingEdited()
    const formValue = this.checklistForm.getRawValue()

    if (checklist?.id) {
      this.checklistService.edit$.next({
        id: checklist!.id!,
        data: formValue
      })
    } else {
      this.checklistService.add$.next({
        ...formValue
      })
    }

    
      
  }
}
