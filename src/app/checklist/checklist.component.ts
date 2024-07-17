import { Component, computed, effect, inject, signal } from '@angular/core'
import { ChecklistService } from '../shared/data-access/checklist.service'
import { ActivatedRoute } from '@angular/router'
import { toSignal } from '@angular/core/rxjs-interop'
import { ChecklistHeaderComponent } from './ui/checklist-header.component'
import { ChecklistItemService } from './data-access/checklist-item.service'
import { FormBuilder } from '@angular/forms'
import { ChecklistItem } from '../shared/interfaces/checklist-item'
import { ModalComponent } from '../shared/ui/modal.component'
import { FormModalComponent } from '../shared/ui/form-modal/form-modal.component'
import { ChecklistItemListComponent } from './ui/checklist-item-list.component'

@Component({
  selector: 'app-checklist',
  standalone: true,
  imports: [ChecklistHeaderComponent, ModalComponent, FormModalComponent, ChecklistItemListComponent],
  templateUrl: './checklist.component.html',
  styles: [
    `
      button {
        margin-left: 1rem;
      }
    `,
  ],
})
export class ChecklistComponent {
  checklistService = inject(ChecklistService)
  checklistItemService = inject(ChecklistItemService)
  route = inject(ActivatedRoute)
  formBuilder = inject(FormBuilder)

  checklistItemBeingEdited = signal<Partial<ChecklistItem> | null>(null)

  params = toSignal(this.route.paramMap)

  checklist = computed(() =>
    this.checklistService.checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  )

  checklistItemForm = this.formBuilder.nonNullable.group({
    title: [''],
    description: [''],
    endDate: [null as Date | null]
  })

  items = computed(() =>
    this.checklistItemService.checklistItems()
      .filter((item) => item.checklistId === this.params()?.get('id'))
  )

  constructor() {
    effect(() => {
      const checklistItem = this.checklistItemBeingEdited()

      if (!checklistItem) {
        this.checklistItemForm.reset()
      } else {
        this.checklistItemForm.patchValue({
          title: checklistItem.title,
          description: checklistItem.description || '',
          endDate: checklistItem.endDate ? new Date(checklistItem.endDate) : null
        })
      }
    })
  }

  onSave() {
    const checklistItem = this.checklistItemBeingEdited()
    const formValue = this.checklistItemForm.getRawValue()
    
    if (checklistItem?.id) {
      this.checklistItemService.edit$.next({
        id: checklistItem!.id!,
        data: formValue
      })
      
    } else {
      this.checklistItemService.add$.next({
        item: formValue,
        checklistId: this.checklist()?.id!
      })
    }
  }
}
