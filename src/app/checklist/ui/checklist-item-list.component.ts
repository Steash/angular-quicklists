import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChecklistItem, RemoveChecklistItem, ToggleChecklistItem } from '../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section>
      <ul>
        @for (item of checklistItems(); track item.id) {
          <li>
            <div>
              @if (item.checked) {
                <span>✅</span>
              }
              {{ item.title}}
            </div>
            <div>
              <button (click)="toggle.emit(item.id)">Toggle</button>
              <button (click)="edit.emit(item)">Edit</button>
              <button (click)="delete.emit(item.id)">Delete</button>
            </div>
          </li>
        } @empty {
          <div>
            <h2>Add an item</h2>
            <p>Click the add button to add your first item to this quicklist</p>
          </div>
        }
      </ul>
    </section>
  `,
  styles: ``
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>()
  toggle = output<ToggleChecklistItem>()
  edit = output<ChecklistItem>()
  delete = output<RemoveChecklistItem>()
}
