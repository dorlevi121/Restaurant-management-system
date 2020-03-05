import { QueueState } from "./queue.types";


export const initialQueueState: QueueState = {
    itemsInQueue: [], // Sorted array of order id
    dishesInKitchen: [], // Array of dishes in kitchen
    itemsInDelivery: [], // Array of order id in delivery
}