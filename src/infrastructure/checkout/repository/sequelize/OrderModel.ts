import { Model, Table, PrimaryKey, Column, ForeignKey, BelongsTo, HasMany, AutoIncrement } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/CustomerModel";
import OrderItemModel from "./OrderItemsModel";

@Table({
    tableName: "ORDERS",
    timestamps: false,
})
export default class OrderModel extends Model {

    @PrimaryKey
    @Column
    declare id: string;

    @ForeignKey(() => CustomerModel)
    @Column({ allowNull: false })
    declare customerId: string;

    @BelongsTo(() => CustomerModel)
    declare customer: CustomerModel;

    @HasMany(()=> OrderItemModel)
    declare items: OrderItemModel[];

    @Column({allowNull:false})
    declare total:number;

}