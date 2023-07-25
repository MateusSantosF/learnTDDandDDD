
import Order from "../../domain/entity/Order";
import CustomerModel from "../db/sequelize/model/CustomerModel";
import OrderItemModel from "../db/sequelize/model/OrderItemsModel";
import OrderModel from "../db/sequelize/model/OrderModel";

export default class OrderRepository {

    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customerId: entity.customerId,
            total: entity.total(),
            items: entity.items.map(item=>({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                productId: item.productId
            })),
        }, {include: [{model: OrderItemModel    }]})
    }


}