import { IngredientInterface } from "../models/system/ingredients.model";

export const numberOfQueues: number = 2;
export const numberOfCookingStands: number = 2;
export const numberOfMessengers = 2;
export const deliveryTime = 60;
export const initialBudget = 50;
export const initialIngredientsQuantity: {[title:string]: number} = {};
export const initialIngredientsPrice: {[title:string]: number} = {};

initialIngredientsQuantity['cucumber']= 15;
initialIngredientsQuantity['tomato']= 15;
initialIngredientsQuantity['cheese']= 15;
initialIngredientsQuantity['meat']= 15;
initialIngredientsQuantity['lettuce']= 15;
initialIngredientsQuantity['rice']= 15;
initialIngredientsQuantity['salmon']= 15;

initialIngredientsPrice['cucumber']= 1;
initialIngredientsPrice['tomato']= 1;
initialIngredientsPrice['cheese']= 2;
initialIngredientsPrice['meat']= 3;
initialIngredientsPrice['lettuce']= 1;
initialIngredientsPrice['rice']= 2;
initialIngredientsPrice['salmon']= 3;