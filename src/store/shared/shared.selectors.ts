import {sharedState} from "../shared/shared.types";

export const getOrdersInQueue = (state: any) => state.shared.ordersInQueue;
export const ordersNumber = (state: any) => state.shared.ordersNumber;