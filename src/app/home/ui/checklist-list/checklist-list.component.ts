import { Component, input } from '@angular/core';
import { Checklist } from '../../../shared/interfaces/checklist';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ul>
      @for (checklist of checklists(); track checklist.id) {
        <li>{{ checklist.title }}</li>
        {{ checklist.id }}
      } @empty {
        <p>Click the add button to create your first checklist!</p>
      }
    </ul>

    <a routerLink="/checklist/{{ checklist.id }}">
      {{ checklist.title}}
    </a>
  `,
  styles: ``
})
export class ChecklistListComponent {
  checklists = input.required<Checklist[]>()
}
