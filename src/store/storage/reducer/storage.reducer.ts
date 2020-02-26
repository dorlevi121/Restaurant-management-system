import {initialStorageState} from "../storage.state";
import {refuelIngredientsActionType, StorageState, updateBudgetActionType} from "../storage.types";
import {StorageActionsEnum} from "../storage.actions";

//All actions types
type  allStorageActionsType = refuelIngredientsActionType | updateBudgetActionType;

export const storageReducer = (state:StorageState = initialStorageState, action:allStorageActionsType) => {
    switch (action.type) {
        case StorageActionsEnum.REFUEL_INGREDIENTS:
            return {...state, ingredients: action.newIngredients}
        case StorageActionsEnum.UPDATE_BUDGET:
            return {...state, budget: action.newBudget}
    }

    return state;
}