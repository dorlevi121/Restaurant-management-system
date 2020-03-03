import * as Ingredients from "../models/system/ingredients.model";
import {IngredientInterface} from "../models/system/ingredients.model";

export const numberOfQueues: number = 3;
export const numberOfCookingStands: number = 3;
export const numberOfMessengers = 2;
export const deliveryTime = 5;
export const initialBudget = 50;
export const initialIngredients: {[title:string]: IngredientInterface} = {};

initialIngredients['cucumber']= Ingredients.Cucumber;
initialIngredients['tomato']= Ingredients.Tomato;
initialIngredients['cheese']= Ingredients.Cheese;
initialIngredients['meat']= Ingredients.Meat;
initialIngredients['lettuce']= Ingredients.Lettuce;

