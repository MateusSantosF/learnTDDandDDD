
import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo } from "sequelize-typescript";
import CustomerModel from "./CustomerModel";
import Customer from "../../../../domain/entity/Customer";
import ProductModel from "./ProductModel";
import OrderModel from "./OrderModel";

@Table({
    tableName: "ORDER_ITEMS",
    timestamps: false
})
export default class OrderItemModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => ProductModel)
    @Column({ allowNull: false })
    declare productId: string;

    @BelongsTo(() => ProductModel)
    declare product: ProductModel;

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare orderId: string;

    @BelongsTo(() => OrderModel)
    declare order: ProductModel;

    @Column({allowNull:false})
    declare quantity:number;

    @Column({allowNull:false})
    declare name:string;

    @Column({allowNull:false})
    declare price:number;
    
}