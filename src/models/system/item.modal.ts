import { DishType } from "./dish.model";
import { UserType } from "./user-type.model";

export type ItemType = {
    orderId: number,
    userType: UserType,
    dishes: DishType [],
    numOfReadyDishes: number //Every time that dish finished in the kitchen will do ++
}