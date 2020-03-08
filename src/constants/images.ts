import burger from '../assets/dishesImg/burger.jpg';
import pizza from '../assets/dishesImg/pizza.jpg';
import sushi from '../assets/dishesImg/sushi.jpg';

import tomato from '../assets/ingredients-icons/tomato.png';
import meat from '../assets/ingredients-icons/meat.png';
import cheese from '../assets/ingredients-icons/cheese.png';
import lettuce from '../assets/ingredients-icons/lettuce.png';
import cucumber from '../assets/ingredients-icons/cucumber.png';
import salmon from '../assets/ingredients-icons/salmon.png';
import rice from '../assets/ingredients-icons/rice.png';

import delivery from '../assets/delivery-icon/delivery-icon.png';
import {initialIngredientsQuantity} from "../config/config";


export const burgerImg = burger;
export const pizzaImg = pizza;
export const sushiImg = sushi;

export const tomatoImg = tomato;
export const meatImg = meat;
export const cheeseImg = cheese;
export const lettuceImg = lettuce;
export const cucumberImg = cucumber;
export const riceImg = rice;
export const salmonImg = salmon;

export const deliveryImg = delivery;

export const ingIcons: {[title:string]: any} = {};

ingIcons['cucumber']= cucumber;
ingIcons['tomato']= tomato;
ingIcons['cheese']= cheese;
ingIcons['meat']= meat;
ingIcons['lettuce']= lettuce;
ingIcons['rice']= rice;
ingIcons['salmon']= salmon;