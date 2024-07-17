import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MenuItem } from '../../../models/coffee-drink.model';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-edit-coffee',
  standalone: true,
  imports: [ReactiveFormsModule, MatSelectModule, MatInputModule],
  template: `

    <header>
      <h2>{{ title }}</h2>
      <button (click)="close.emit()">close</button>
    </header>

    <section>
      <form [formGroup]="formGroup" (ngSubmit)="save.emit(); close.emit()" class="col">
        <div>
        <div>
          <label for="name">Name</label>
          <select id="name" formControlName="name">
            @for (drink of menuItems; track drink){
              <option [value]="drink">{{ drink }}</option>
            }
          </select>
        </div>
        </div>
        
        <div>
          <label for="price">Price</label>
          <input id="price" type="number" formControlName="price">
        </div>
        
        <div>
          <label for="description">Description</label>
          <input id="description" type="text" formControlName="description">
        </div>

        <button type="submit">Save</button>
      </form>
    </section>
  `,
  styles: ``
})
export class EditCoffeeComponent {
  @Input() title!: String
  @Input() formGroup!: FormGroup
  @Output() save = new EventEmitter() 
  @Output() close = new EventEmitter() 

  menuItems = Object.values(MenuItem);
}
