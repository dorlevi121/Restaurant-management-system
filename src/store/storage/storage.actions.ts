import {IngredientInterface} from "../../models/system/ingredients.model";
import {Dispatch} from "redux";
import {StorageActionsEnum} from "./storage.types";


export const refillIngredients = (ingredients: {[titile:string]: number}) => {
    return {type: StorageActionsEnum.REFILL_INGREDIENTS, ingredients: ingredients};
}

export const returnIngredients = (ingredients: IngredientInterface[]) => {
    return {type: StorageActionsEnum.RETURN_INGREDIENTS, ingredients: ingredients};
}

export const removeIngredients = (ingredients: IngredientInterface[]) => {
    return {type: StorageActionsEnum.REMOVE_INGREDIENTS, ingredients: ingredients};
}

export const updateBudget = (amount: number, action: 'add' | 'reduce') => {
    return {type: StorageActionsEnum.UPDATE_BUDGET, action: action, amount: amount};
}