import {DishInterface, priceCalculation, timeCalculation} from "../models/system/dish.model";
import * as Ingredients from '../models/system/ingredients.model';
import { burgerImg, pizzaImg, sushiImg } from './images';

const menu: DishInterface[] = [
    {
        title: 'Burger',
        ingredients: [Ingredients.Tomato, Ingredients.Meat, Ingredients.Cheese],
        duration: timeCalculation([Ingredients.Tomato, Ingredients.Meat, Ingredients.Cheese]),
        image: burgerImg,
        id: '',
        price: priceCalculation( [Ingredients.Tomato, Ingredients.Meat, Ingredients.Cheese]),
        orderId: '',
        kitchenEntryTime: 0
    },

    {
        title: 'Pizza',
        ingredients: [Ingredients.Cheese, Ingredients.Tomato],
        duration: timeCalculation([Ingredients.Cheese, Ingredients.Tomato]),
        image: pizzaImg,
        id: '',
        price: priceCalculation([Ingredients.Cheese, Ingredients.Tomato]),
        orderId: '',
        kitchenEntryTime: 0
    },

    {
        title: 'Sushi',
        ingredients: [Ingredients.Rice, Ingredients.Salmon],
        duration: timeCalculation([Ingredients.Rice, Ingredients.Salmon]),
        image: sushiImg,
        id: '',
        price: priceCalculation([Ingredients.Rice, Ingredients.Salmon]),
        orderId: '',
        kitchenEntryTime: 0
    }
];


export default menu;