import {IngredientType} from "../../models/system/ingredients.model";
import {Dispatch} from "redux";
import {StorageActionsEnum} from "./storage.actions";


export const dispatchRefuelIngredients = (ingredients: {[title: string]: IngredientType}, dispatch: Dispatch) => {
    return dispatch({type: StorageActionsEnum.REFUEL_INGREDIENTS, newIngrediens: ingredients});
}


export const dispatchUpdateBudget = (budget: number, dispatch: Dispatch) => {
    return dispatch({type: StorageActionsEnum.UPDATE_BUDGET, newBudget: budget});
}