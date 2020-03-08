import { initialIngredientsPrice } from '../../config/config';
import { lettuceImg, cheeseImg, tomatoImg, meatImg, cucumberImg, riceImg, salmonImg } from '../../constants/images';

export type IngredientInterface = {
    title: string,
    price: number,
    duration: number,
    image: string,
    amountInDish: number,
    myDishId: string
}

export const Tomato: IngredientInterface = {
    title: 'tomato',
    price: initialIngredientsPrice['tomato'],
    duration: 8,
    image: tomatoImg,
    amountInDish: 0,
    myDishId: ''
}

export const Meat: IngredientInterface = {
    title: 'meat',
    price: initialIngredientsPrice['meat'],
    duration: 30,
    image: meatImg,
    amountInDish: 0,
    myDishId: ''
}

export const Cheese: IngredientInterface = {
    title: 'cheese',
    price: initialIngredientsPrice['cheese'],
    duration: 10,
    image: cheeseImg,
    amountInDish: 0,
    myDishId: ''
}

export const Lettuce: IngredientInterface = {
    title: 'lettuce',
    price: initialIngredientsPrice['lettuce'],
    duration: 10,
    image: lettuceImg,
    amountInDish: 0,
    myDishId: ''
}

export const Cucumber: IngredientInterface = {
    title: 'cucumber',
    price: initialIngredientsPrice['cucumber'],
    duration: 3,
    image: cucumberImg,
    amountInDish: 0,
    myDishId: ''
}

export const Rice: IngredientInterface = {
    title: 'rice',
    price: initialIngredientsPrice['rice'],
    duration: 5,
    image: riceImg,
    amountInDish: 0,
    myDishId: ''
}

export const Salmon: IngredientInterface = {
    title: 'salmon',
    price: initialIngredientsPrice['salmon'],
    duration: 4,
    image: salmonImg,
    amountInDish: 0,
    myDishId: ''
}

