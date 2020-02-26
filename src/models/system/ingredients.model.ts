import tomato from '../../assets/ingredients-icons/tomato.png';
import meat from '../../assets/ingredients-icons/meat.png';
import cheese from '../../assets/ingredients-icons/cheese.png';
import lettuce from '../../assets/ingredients-icons/lettuce.png';
import cucumber from '../../assets/ingredients-icons/cucumber.png';

export type IngredientType = {
    title: string,
    price: number,
    quantity: number,
    image: string
}

export const Tomato: IngredientType = {
    title: 'tomato',
    price: 1,
    quantity: 5,
    image: tomato
}

export const Meat: IngredientType = {
    title: 'meat',
    price: 5,
    quantity: 5,
    image: meat
}

export const Cheese: IngredientType = {
    title: 'cheese',
    price: 3,
    quantity: 5,
    image: cheese
}

export const Lettuce: IngredientType = {
    title: 'lettuce',
    price: 2,
    quantity: 5,
    image: lettuce
}

export const Cucumber: IngredientType = {
    title: 'cucumber',
    price: 2,
    quantity: 5,
    image: cucumber
}

