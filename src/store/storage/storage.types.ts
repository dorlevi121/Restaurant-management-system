import {IngredientType} from "../../models/system/ingredients.model";
import {StorageActionsEnum} from "./storage.actions";

export interface StorageState {
    ingredients: {[titile:string]: IngredientType}, //All ingredients were initialized with 5 pieces
    budget: number
}

export interface storageActionPattern {
    type: StorageActionsEnum; //Enum of actions
}

export interface refuelIngredientsActionType extends storageActionPattern {
    type: StorageActionsEnum.REFUEL_INGREDIENTS;
    newIngredients: {[titile:string]: IngredientType};
}

export interface updateBudgetActionType extends storageActionPattern {
    type: StorageActionsEnum.UPDATE_BUDGET;
    newBudget: number;
}