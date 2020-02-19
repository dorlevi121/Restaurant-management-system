import IngredientsModel from "../../models/system/Ingredients.model";
import burgerImg from '../dishesImg/burger.png';
import pizzaImg from '../dishesImg/pizza.png';

const Dishes = [
    {name: 'Burger', Ingredients:['Tomato', 'Meat', 'Cucumber'],
    time: 60, image: burgerImg },

    {name: 'Pizza', Ingredients:['Tomato', 'Cucumber'],
        time: 60, image: pizzaImg }
];


export default Dishes;