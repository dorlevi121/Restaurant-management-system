import IngredientsModel from "../../models/system/Ingredients.model";
import burgerImg from '../dishesImg/burger.png';
import pizzaImg from '../dishesImg/pizza.png';
import {Dish} from "../../models/system/dish.model";

const menu: Dish[] = [
    {title: 'Burger', ingredients:['Tomato', 'Meat', 'Cucumber'],
    duration: 60, image: burgerImg, id:0, price:10},

    {title: 'Pizza', ingredients:['Tomato', 'Cucumber'],
        duration: 60, image: pizzaImg, id:1, price: 5 }
];


export default menu;