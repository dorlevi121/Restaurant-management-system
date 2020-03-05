import { DishInterface } from "./dish.model";
import { UserType } from "./user-type.enum";

export type ItemInterface = {
    orderId: string,
    userType: UserType,
    dishes: DishInterface [],
    numOfReadyDishes: number, //Every time that dish finished in the kitchen will do ++
    deliveryEntryTime?: number
}