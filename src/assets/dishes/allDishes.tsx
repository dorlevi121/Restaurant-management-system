import burgerImg from '../dishesImg/burger.png';
import pizzaImg from '../dishesImg/pizza.png';
import {DishType, priceCalculation, timeCalculation} from "../../models/system/dish.model";
import * as Ingredients from '../../models/system/ingredients.model';

const menu: DishType[] = [
    {
        title: 'Burger',
        ingredients: [Ingredients.Tomato, Ingredients.Meat, Ingredients.Cheese],
        duration: timeCalculation([Ingredients.Tomato, Ingredients.Meat, Ingredients.Cheese]),
        image: burgerImg,
        id: 0,
        price: priceCalculation( [Ingredients.Tomato, Ingredients.Meat, Ingredients.Cheese]),
        date: null,
        orderId: -1
    },

    {
        title: 'Pizza',
        ingredients: [Ingredients.Cheese, Ingredients.Tomato],
        duration: timeCalculation([Ingredients.Cheese, Ingredients.Tomato]),
        image: pizzaImg,
        id: 1,
        price: priceCalculation([Ingredients.Cheese, Ingredients.Tomato]),
        date: null,
        orderId: -1
    }
];


export default menu;