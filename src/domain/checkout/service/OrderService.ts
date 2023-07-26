

import Customer from "../../customer/entity/Customer";
import OrderItem from "../entity/OrderItem";
import {v4 as uuid} from 'uuid'
import Order from "../entity/Order";

export default class OrderService{
    
    static placeOrder(costumer: Customer, items: OrderItem[]) : Order{

        if(items.length == 0){
            throw new Error("Order must have at least one item")
        }

        const order = new Order(uuid(), costumer.id, items);
        costumer.addRewardPoints(order.total()/2)
        return order;
    }

    static total(orders:Order[]): Number{
       return orders.reduce((acc, order)=>acc + order.total(), 0 ); 
    }
}