import {StorageState, updateBudgetActionType} from "../storage.types";
import {cloneDeep} from "lodash";


export const updateBudget = (action: updateBudgetActionType, state: StorageState) => {
    let curBudget = cloneDeep(state.budget);

    switch (action.action) {
        case "add":
            curBudget += action.amount;
            break;
        case "reduce":
            curBudget -= action.amount
            break;
    }
    return {...state, budget: curBudget}
}

