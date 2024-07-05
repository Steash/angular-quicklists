import { Component, input, output } from '@angular/core';
import { Checklist, ResetChecklist } from '../../shared/interfaces/checklist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checklist-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header>
        <a routerLink="/home">back</a>
        
        <h1>{{ checklist().title }}</h1>
        <div>
          <button (click)="resetChecklist.emit(checklist().id)" >Reset</button>
          <button (click)="addItem.emit()">Add Item</button>
        </div>
    </header>
  `,
  styles: ``
})
export class ChecklistHeaderComponent {
  checklist = input.required<Checklist>()
  addItem = output()
  resetChecklist = output<ResetChecklist>()
}
