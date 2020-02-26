import burgerImg from '../dishesImg/burger.png';
import pizzaImg from '../dishesImg/pizza.png';
import {DishType, priceCalculation} from "../../models/system/dish.model";
import * as Ingredients from '../../models/system/ingredients.model';
import {Tomato} from "../../models/system/ingredients.model";

const menu: DishType[] = [
    {
        title: 'Burger',
        ingredients: [Ingredients.Tomato, Ingredients.Meat, Ingredients.Cheese],
        duration: 100,
        image: burgerImg,
        id: 0,
        price: priceCalculation( [Ingredients.Tomato, Ingredients.Meat, Ingredients.Cheese])
    },

    {
        title: 'Pizza',
        ingredients: [Ingredients.Cheese, Ingredients.Tomato],
        duration: 60,
        image: pizzaImg,
        id: 1,
        price: priceCalculation([Ingredients.Cheese, Ingredients.Tomato])
    }
];


export default menu;