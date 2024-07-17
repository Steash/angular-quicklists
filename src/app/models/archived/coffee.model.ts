export interface Coffee {
    id: string
    name: string
    description: string
    imageUrl?: string
    price: number
    quantity: number
    roastLevel: RoastLevel
    origin: string
    type: BeanType
}

export enum RoastLevel {
    Light = 'Light',
    Medium = 'Medium',
    Dark = 'Dark'
}

export enum BeanType {
    Arabica = 'Arabica',
    Robusta = 'Robusta'
}