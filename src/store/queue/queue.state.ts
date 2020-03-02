import { QueueState } from "./queue.types";


export const initialQueueState: QueueState = {
    OrdersIdInQueue: [], // Sorted array of order id
    dishesInKitchen: [], // Array of dishes in kitchen
    OrdersIdInDelivery: [] // Array of order id in delivery
}