import {initialStorageState} from "./storage.state";
import {refillIngredientsActionType, removeIngredientsActionType, StorageActionsEnum,
    StorageState, updateBudgetActionType} from "./storage.types";
import {refillIngredients} from "./reducers/refill-ingredients.reducer";
import {removeIngredients} from "./reducers/remove-ingredients.reducer";
import {updateBudget} from "./reducers/update-budget.reducer";

//All actions types
type  allStorageActionsType = refillIngredientsActionType | updateBudgetActionType | removeIngredientsActionType;

export const storageReducers = (state: StorageState = initialStorageState, action: allStorageActionsType) => {
    switch (action.type) {
        case StorageActionsEnum.REFILL_INGREDIENTS:
            return refillIngredients(action, state)

        case StorageActionsEnum.REMOVE_INGREDIENTS:
            return removeIngredients(action, state)

        case StorageActionsEnum.UPDATE_BUDGET:
            return updateBudget(action, state)
    }

    return state;
}