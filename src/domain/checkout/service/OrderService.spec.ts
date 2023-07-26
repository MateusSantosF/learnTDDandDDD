import Customer from "../../customer/entity/Customer";
import Order from "../entity/Order";
import OrderItem from "../entity/OrderItem"
import OrderService from "./OrderService";


describe("Order service unit tests", ()=>{

    
    it('should place a order', ()=>{
        const costumer  = new Customer('c1', 'Customer1')
        const item1 = new OrderItem('1', 'Item 1', 10, '1', 1);

        const order = OrderService.placeOrder(costumer, [item1])
        expect(costumer.rewardPoints).toBe(5)
        expect(order.total()).toBe(10)

    })

    it("should get total of all orders", ()=>{

        const item1 = new OrderItem('1', 'Item 1', 100, '1', 1);
        const item2 = new OrderItem('2', 'Item 2', 200, '1', 2);

        const order1 = new Order("o2",'2', [item1])
        const order2 = new Order("o2",'2', [item2])

        const total = OrderService.total([order1, order2])

        expect(total).toBe(500)
    })
})