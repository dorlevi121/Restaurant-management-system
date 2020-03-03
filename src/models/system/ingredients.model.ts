import tomato from '../../assets/ingredients-icons/tomato.png';
import meat from '../../assets/ingredients-icons/meat.png';
import cheese from '../../assets/ingredients-icons/cheese.png';
import lettuce from '../../assets/ingredients-icons/lettuce.png';
import cucumber from '../../assets/ingredients-icons/cucumber.png';

export type IngredientInterface = {
    title: string,
    price: number,
    quantity: number,
    duration: number,
    image: string
}

export const Tomato: IngredientInterface = {
    title: 'tomato',
    price: 1,
    quantity: 5,
    duration: 8,
    image: tomato
}

export const Meat: IngredientInterface = {
    title: 'meat',
    price: 5,
    quantity: 5,
    duration: 30,
    image: meat
}

export const Cheese: IngredientInterface = {
    title: 'cheese',
    price: 3,
    quantity: 5,
    duration: 10,
    image: cheese
}

export const Lettuce: IngredientInterface = {
    title: 'lettuce',
    price: 2,
    quantity: 5,
    duration: 10,
    image: lettuce
}

export const Cucumber: IngredientInterface = {
    title: 'cucumber',
    price: 2,
    quantity: 5,
    duration: 3,
    image: cucumber
}

