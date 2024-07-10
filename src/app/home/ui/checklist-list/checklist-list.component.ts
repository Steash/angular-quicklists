import { Component, OnInit, inject, input, output } from '@angular/core';
import { Checklist, EditChecklist, RemoveChecklist } from '../../../shared/interfaces/checklist';
import { RouterLink } from '@angular/router';
import { ChecklistService } from '../../../shared/data-access/checklist.service';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ul>
      @for (checklist of checklists(); track checklist.id) {
        <li>
          <a routerLink="/checklist/{{ checklist.id }}">
            {{ checklist.title }}
          </a>
          <div>
            <button (click)="edit.emit(checklist)">Edit</button>
            <button (click)="delete.emit(checklist.id)">Remove</button>
          </div>
        </li>
      } @empty {
        <p>Click the add button to create your first checklist!</p>
      }
    </ul>
  `,
  styles: ``
})
export class ChecklistListComponent implements OnInit {
  checklists = input.required<Checklist[]>()
  edit = output<Checklist>()
  delete = output<RemoveChecklist>()

  ngOnInit() {
    console.log(this.checklists);
  }

}
