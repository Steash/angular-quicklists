import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CoffeeDrink, RemoveCoffee } from '../../../models/coffee-drink.model';

@Component({
  selector: 'app-coffee-grid',
  standalone: true,
  imports: [],
  template: `
    @for (coffee of coffees; track coffee.id) {
      <div class="coffee-card">
        <h3>{{ coffee.name }}</h3>
        <p>{{ coffee.description }}</p>
        <h4>{{ coffee.price }}</h4>

        <div class="row">
          <button (click)="edit.emit(coffee)">
            Edit
          </button>
          <button (click)="delete.emit(coffee.id)">
            Remove
          </button>
        </div>
      </div>
    } @empty {
      <p>No coffees</p>
    }
  `,
  styles: `
    .coffee-card {
      border: 1px solid black;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      max-width: fit-content;
    }
  `
})
export class CoffeeGridComponent {
  @Input() coffees!: CoffeeDrink[]
  @Output() edit = new EventEmitter<CoffeeDrink>() 
  @Output() delete = new EventEmitter<RemoveCoffee>() 
}
