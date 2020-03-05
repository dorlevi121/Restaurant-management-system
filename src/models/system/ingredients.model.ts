import tomato from '../../assets/ingredients-icons/tomato.png';
import meat from '../../assets/ingredients-icons/meat.png';
import cheese from '../../assets/ingredients-icons/cheese.png';
import lettuce from '../../assets/ingredients-icons/lettuce.png';
import cucumber from '../../assets/ingredients-icons/cucumber.png';

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
    price: 1,
    duration: 8,
    image: tomato,
    amountInDish: 0,
    myDishId: ''
}

export const Meat: IngredientInterface = {
    title: 'meat',
    price: 5,
    duration: 30,
    image: meat,
    amountInDish: 0,
    myDishId: ''
}

export const Cheese: IngredientInterface = {
    title: 'cheese',
    price: 3,
    duration: 10,
    image: cheese,
    amountInDish: 0,
    myDishId: ''
}

export const Lettuce: IngredientInterface = {
    title: 'lettuce',
    price: 2,
    duration: 10,
    image: lettuce,
    amountInDish: 0,
    myDishId: ''
}

export const Cucumber: IngredientInterface = {
    title: 'cucumber',
    price: 2,
    duration: 3,
    image: cucumber,
    amountInDish: 0,
    myDishId: ''
}

