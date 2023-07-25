import { Order } from "sequelize";
import Address from "../../domain/entity/Address";
import Customer from "../../domain/entity/Customer";
import ICustomerRepository from "../../domain/repository/ICostumerRepository";
import CustomerModel from "../db/sequelize/model/CustomerModel";
import OrderModel from "../db/sequelize/model/OrderModel";

export default class ProductRepository implements ICustomerRepository {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            number: entity.Address.number,
            zipcode: entity.Address.zip,
            city: entity.Address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        }, {
            where: { id: entity.id }
        })
    }

    async findById(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findOne({ where: { id: id } })

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zipcode,
            customerModel.city,
        )

        const customer = new Customer(
            customerModel.id,
            customerModel.name,
        )
        customer.changeAddress(address);
        if (customerModel.active) {
            customer.activate()
        }

       
        customer.addRewardPoints(customerModel.rewardPoints)
        return customer;
    }

    async findAll(): Promise<Customer[]> {
        return (await CustomerModel.findAll()).map(c => {
            const address = new Address(
                c.street,
                c.number,
                c.zipcode,
                c.city,
            )

            const customer = new Customer(
                c.id,
                c.name
            )
            customer.changeAddress(address);
            if (c.active) {
                customer.activate()
            }
         
            customer.addRewardPoints(c.rewardPoints)
            return customer;
        })
    }



}