import { Injectable, signal, inject, effect, computed } from "@angular/core";
import { AddCoffee, CoffeeDrink, EditCoffee, RemoveCoffee } from "../models/coffee-drink.model";
import { Subject } from "rxjs";
import { takeUntilDestroyed } from "@angular/core/rxjs-interop";

export interface CoffeesState {
    coffees: CoffeeDrink[]
    loaded: boolean
    error: string | null
}

@Injectable({
    providedIn: 'root'
})
export class CoffeeService {
    // state 
    private state = signal<CoffeesState>({
        coffees: [],
        loaded: false,
        error: null
    })

    // selectors
    coffees = computed(() => this.state().coffees)
    loaded = computed(() => this.state().loaded)

    // sources
    add$ = new Subject<AddCoffee>()
    edit$ = new Subject<EditCoffee>()
    remove$ = new Subject<RemoveCoffee>()

    constructor() {
        // reducers
        this.add$.pipe(takeUntilDestroyed()).subscribe((coffee) => 
            this.state.update((state) => ({
                ...state,
                coffees: [
                    ...state.coffees,
                    {
                        ...coffee,
                        id: Date.now().toString(),
                    }
                ]
            }))
        )

        this.edit$.pipe(takeUntilDestroyed()).subscribe((update) =>
            this.state.update((state) => ({
                ...state,
                coffees: state.coffees.map((coffee) =>
                    coffee.id === update.id
                        ? { 
                            ...coffee, 
                            name: update.data.name,
                            price: update.data.price,
                            description: update.data.description
                          }
                        : coffee
                )
            }))
        )

        this.remove$.pipe(takeUntilDestroyed()).subscribe((id) =>
            this.state.update((state) => ({
                ...state,
                coffees: state.coffees.filter(coffees => coffees.id !== id)
            }))
        )

        // effects
        // effect(() => {
        //     if (this.loaded()) {
        //         t
        //     }
        // })
    }
}