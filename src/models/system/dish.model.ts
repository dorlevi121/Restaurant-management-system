import {IngredientType} from "./ingredients.model";

export type DishType = {
    id: number,
    title: string,
    ingredients: IngredientType[],
    duration: number,
    price: number,
    image: string,
    orderId?: number,
    finishTims?: number,
    date: Date | null
}

export const priceCalculation = (ingredients: IngredientType[]): number => {
    let sum = 0;
    for (let i = 0; i < ingredients.length; i++)
        sum += ingredients[i].price;
    return sum;
}

export const timeCalculation = (ingredients: IngredientType[]): number => {
    let sum = 0;
    for (let i = 0; i < ingredients.length; i++)
        sum += ingredients[i].duration;
    return sum;
}