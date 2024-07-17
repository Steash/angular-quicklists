import { Component, OnInit, inject, input, output } from '@angular/core';
import { Checklist, EditChecklist, RemoveChecklist } from '../../../shared/interfaces/checklist';
import { RouterLink } from '@angular/router';
import { ChecklistService } from '../../../shared/data-access/checklist.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checklist-list',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <ul>
      @for (checklist of checklists(); track checklist.id) {
        <li>
          <a routerLink="/checklist/{{ checklist.id }}">
            {{ checklist.title }}
          </a>
          <p>Created on: {{ checklist.creationDate | date }}</p>
          <p *ngIf="checklist.description">Description: {{ checklist.description }}</p>
          <p *ngIf="checklist.endDate">Ends on: {{ checklist.endDate | date }}</p>
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
  styles: [
    `
      ul {
        padding: 0;
        margin: 0;
      }
      li {
        font-size: 1.5em;
        display: flex;
        justify-content: space-between;
        background: var(--color-light);
        list-style-type: none;
        margin-bottom: 1rem;
        padding: 1rem;

        button {
          margin-left: 1rem;
        }
      }
    `,
  ],
})
export class ChecklistListComponent implements OnInit {
  checklists = input.required<Checklist[]>()
  edit = output<Checklist>()
  delete = output<RemoveChecklist>()

  ngOnInit() {
    console.log(this.checklists);
  }

}
