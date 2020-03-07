import {IngredientInterface} from "../../models/system/ingredients.model";

export interface StorageState {
    ingredientsQuantity: {[title:string]: number}, //All ingredients were initialized with 5 pieces
    budget: number
}

export enum StorageActionsEnum {
    REFILL_INGREDIENTS = 'REFILL_INGREDIENTS',
    RETURN_INGREDIENTS = 'RETURN_INGREDIENTS',
    REMOVE_INGREDIENTS = 'REMOVE_INGREDIENTS',
    UPDATE_BUDGET = 'UPDATE_BUDGET'
}

export interface storageActionPattern {
    type: StorageActionsEnum; //Enum of actions
}

export interface refillIngredientsActionType extends storageActionPattern {
    type: StorageActionsEnum.REFILL_INGREDIENTS;
    ingredients: {[titile:string]: number;}
}

export interface returnIngredientsActionType extends storageActionPattern {
    type: StorageActionsEnum.RETURN_INGREDIENTS;
    ingredients: IngredientInterface[];
}


export interface removeIngredientsActionType extends storageActionPattern {
    type: StorageActionsEnum.REMOVE_INGREDIENTS;
    ingredients: IngredientInterface[];
}

export interface updateBudgetActionType extends storageActionPattern {
    type: StorageActionsEnum.UPDATE_BUDGET;
    action: 'add' | 'reduce';
    amount: number;
}