import { Sequelize } from "sequelize-typescript"
import CustomerRepository from "./CustomerRepository";
import Customer from "../../domain/entity/Customer";
import CustomerModel from "../db/sequelize/model/CustomerModel";
import Address from "../../domain/entity/Address";
import OrderModel from "../db/sequelize/model/OrderModel";
import OrderItemModel from "../db/sequelize/model/OrderItemsModel";
import ProductModel from "../db/sequelize/model/ProductModel";
import ProductRepository from "./ProductRepository";
import Product from "../../domain/entity/Product";
import OrderItem from "../../domain/entity/OrderItem";
import Order from "../../domain/entity/Order";
import OrderRepository from "./OrderRepository";

describe('OrderRepository unit tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel])
        await sequelize.sync();
    })


    afterEach(async () => {
        await sequelize.close()
    })


    it('should create new Order', async () => {

        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Mateus')
        const address = new Address('rua x', 200, '232232-403', 'SP')
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Fork', 23.0)
        await productRepository.create(product);

        const orderItem = new OrderItem(
            '1',
            product.name,
            product.price,
            product.id,
            2
        )

        const orderRepository = new OrderRepository();
        const order = new Order('1', customer.id, [orderItem]);

        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] })
        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customerId: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    productId: orderItem.productId,
                    orderId: order.id
                }
            ]
        })

    })

    it('Should update Order', async ()=>{
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Mateus')
        const address = new Address('rua x', 200, '232232-403', 'SP')
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Fork', 10)
        const product2 = new Product('2', 'Knife', 20)
        await productRepository.create(product);
        await productRepository.create(product2);

        const orderItem = new OrderItem(
            '1',
            product.name,
            product.price,
            product.id,
            2
        )
        const orderItem2 = new OrderItem(
            '2',
            product2.name,
            product2.price,
            product2.id,
            3
        )

        const orderRepository = new OrderRepository();
        const order = new Order('1', customer.id, [orderItem]);
        await orderRepository.create(order);
    
        const orderUpdated = new Order(order.id, customer.id, [orderItem, orderItem2]);
        await orderRepository.update(orderUpdated);
        
        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'] })
        expect(orderModel.toJSON())
            .toStrictEqual({
            id: '1',
            customerId: '1',
            total: orderUpdated.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    price: orderItem.price,
                    quantity: orderItem.quantity,
                    productId: orderItem.productId,
                    orderId: order.id
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity,
                    productId: orderItem2.productId,
                    orderId: order.id
                },
            ]
        })
    })      
})