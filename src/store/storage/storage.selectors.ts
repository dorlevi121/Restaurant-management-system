import {StorageState} from "./storage.types";

export const getIngredientsInStorage = (state:any) =>  state.storage.ingredients;
export const getBudget = (state: any) => state.storage.budget;