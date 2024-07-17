export interface CoffeeDrink {
    id: string
    name: MenuItem
    price: number
    description: string
}

export enum MenuItem {
    Espresso = "Espresso",
    Cappuccino = "Cappuccino",
    Latte = "Latte",
    FlatWhite = "Flat White",
    Americano = "Americano",
    Mocha = "Mocha",
    V60 = "V60",
    Aeropress = "Aeropress",
    BatchBrew = "Batch brew",
    MatchaTea = "Matcha tea",
    MatchaLatte = "Matcha latte"
}

export type AddCoffee = Omit<CoffeeDrink, 'id'>
export type EditCoffee = { id: CoffeeDrink['id']; data: AddCoffee }
export type RemoveCoffee = CoffeeDrink['id']