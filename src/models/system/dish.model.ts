import {IngredientInterface} from "./ingredients.model";

export type DishInterface = {
    id: string,
    title: string,
    ingredients: IngredientInterface[],
    duration: number,
    price: number,
    image: string,
    orderId: string,
    kitchenEntryTime: number,
}

export const priceCalculation = (ingredients: IngredientInterface[]): number => {
    let sum = 0;
    for (let i = 0; i < ingredients.length; i++)
        sum += ingredients[i].price;
    return sum;
}

export const timeCalculation = (ingredients: IngredientInterface[]): number => {
    let sum = 0;
    for (let i = 0; i < ingredients.length; i++)
        sum += ingredients[i].duration;
    return sum;
}