import {StorageState} from "./storage.types";

export const getIngredientsQuantity = (state: any): {[titile:string]: number} =>  state.storage.ingredientsQuantity;
export const getBudget = (state: any): number => state.storage.budget;