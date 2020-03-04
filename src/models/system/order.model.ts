import {DishInterface} from "./dish.model";
import {UserType} from "./user-type.enum";

export type OrderInterface = {
    id: string,
    userType: UserType,
    dish: DishInterface[],
    totalTime: number,
    price: number,
    deliveryEntryTime?: number
}