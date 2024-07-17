import { Component, effect, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../shared/ui/navbar/navbar.component';
import { CoffeeGridComponent } from './coffee-grid/coffee-grid.component';
import { CoffeeDrink, MenuItem } from '../../models/coffee-drink.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CoffeeService } from '../../services/coffee.service';
import { EditCoffeeComponent } from './edit-coffee/edit-coffee.component';
import { ModalComponent } from '../../shared/ui/modal.component';

@Component({
  selector: 'app-coffee-overview',
  standalone: true,
  imports: [NavbarComponent, CoffeeGridComponent, EditCoffeeComponent, ModalComponent],
  template: `
    <app-navbar/>

    <header>
      <h1>Coffee Menu</h1>
      <button (click)="coffeeBeingEdited.set({})">Add Menu Item</button>
    </header>

    <section>
      <h2>Coffee drinks</h2>
      <app-coffee-grid
        [coffees]="coffeeService.coffees()"
        (edit)="coffeeBeingEdited.set($event)"
        (delete)="coffeeService.remove$.next($event)"
      />
    </section>

    <app-modal [isOpen]="!!coffeeBeingEdited()">
      <ng-template>
        <app-edit-coffee
          [title]="coffeeBeingEdited()?.name 
            ? 'Edit ' + coffeeBeingEdited()!.name
            : 'Add a new menu item'
          "
          [formGroup]="coffeeForm"
          (close)="coffeeBeingEdited.set(null)"
          (save)="onSave()"
        />
      </ng-template>
    </app-modal>
  `,
  styles: `
  
  `
})
export class CoffeeOverviewComponent {
  coffeeBeingEdited = signal<Partial<CoffeeDrink> | null>(null)
  formBuilder = inject(FormBuilder)

  coffeeForm = this.formBuilder.nonNullable.group({
    name: ['' as MenuItem | null],
    description: [''],
    price: [null as number | null]
  })

  constructor(
    // private readonly formBuilder: FormBuilder,
    public coffeeService: CoffeeService
  ) {
    effect(() => {
      const coffee = this.coffeeBeingEdited()

      if (!coffee) {
        this.coffeeForm.reset()
      } else {
        this.coffeeForm.patchValue({
          name: coffee.name,
          description: coffee.description || '',
          price: coffee.price || null
        })
      }
    })
  }

  onSave() {
    const coffee = this.coffeeBeingEdited()
    const formValue = this.coffeeForm.getRawValue()

    if (coffee?.id) {
      this.coffeeService.edit$.next({
        id: coffee!.id!,
        data: formValue as Omit<CoffeeDrink, 'id'>
      })
    } else {
      this.coffeeService.add$.next({
        ...formValue as Omit<CoffeeDrink, 'id'>
      })
    }
  }

  // private buildForm(): FormGroup {
  //   const coffeeForm = this.formBuilder.nonNullable.group({
  //     name: [''],
  //     price: [''],
  //     description: ['']
  //   })

  //   return coffeeForm
  // }
}
