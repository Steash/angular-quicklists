import { Dialog } from '@angular/cdk/dialog';
import {
  Component,
  contentChild,
  input,
  TemplateRef,
  inject,
  effect
} from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  template: `<div></div>`,
  styles: ``
})
export class ModalComponent {
  dialog = inject(Dialog)
  isOpen = input.required<boolean>()
  template = contentChild.required(TemplateRef)

  constructor() {
    effect(() => {
      const isOpen = this.isOpen()

      if (isOpen) {
        this.dialog.open(this.template(), { panelClass: 'dialog-container' })
      } else {
        this.dialog.closeAll()
      }
    })
  }
}
