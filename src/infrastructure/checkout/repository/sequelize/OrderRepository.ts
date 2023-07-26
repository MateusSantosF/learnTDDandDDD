
import Order from "../../../../domain/checkout/entity/Order";

import CustomerModel from "../../../customer/repository/sequelize/CustomerModel";
import OrderItemModel from "./OrderItemsModel";
import OrderModel from "./OrderModel";


export default class OrderRepository {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                orderId: entity.id,
                quantity: item.quantity,
                productId: item.productId
            })),
        }, { include: [{ model: OrderItemModel }] })
    }

    async update(entity: Order): Promise<void> {
  
        try {
            const result = await OrderModel.sequelize.transaction(async ()=>{
                await OrderModel.update({
                    customerId: entity.customerId,
                    total: entity.total(),
                }, { where: { id: entity.id}});
                
                await OrderItemModel.destroy({where:{id: entity.id}})
                
                const items = entity.items.map(item=>{
                    return {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        orderId: entity.id,
                        quantity: item.quantity,
                        productId: item.productId
                    }
                })
                await OrderItemModel.bulkCreate(items)
            })    
        } catch (error) {
            
        }
        
    }

}