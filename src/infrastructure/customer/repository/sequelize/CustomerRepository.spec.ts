import { Sequelize } from "sequelize-typescript"
import CustomerRepository from "./CustomerRepository";
import Customer from "../../../../domain/customer/entity/Customer";
import CustomerModel from "./CustomerModel";
import Address from "../../../../domain/customer/value-object/Address";

describe('CustomerRepository unit tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([CustomerModel])
        await sequelize.sync();
    })


    afterEach(async () => {
        await sequelize.close()
    })  


    it('should create a customer', async ()=>{

        //arrange

        const customerRepository = new CustomerRepository();

        const customer = new Customer('1', 'Mateus');
        const address = new Address('Rua X', 123, '093032-203', 'SP')
        customer.changeAddress(address);
        await customerRepository.create(customer);

        //act
        const customerModel = await CustomerModel.findOne({where: {id:"1"}});


        //assert
        expect(customerModel.toJSON())
        .toStrictEqual({
            id: "1",
            name: "Mateus",
            number: 123,
            rewardPoints: 0,
            street: "Rua X",
            city: 'SP',
            active: '0',
            zipcode: "093032-203",
        });
    })

    it('should update a customer', async()=>{

        //arrange
        const customerRepository = new CustomerRepository();

        const customer = new Customer('1', 'Mateus');
        const address = new Address('Rua X', 123, '093032-203', 'SP')
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({where: {id:"1"}});

        expect(customerModel.toJSON())
        .toStrictEqual({
            id: "1",
            name: "Mateus",
            number: 123,
            rewardPoints: 0,
            street: "Rua X",
            city: 'SP',
            active: '0',
            zipcode: "093032-203",
        });

        customer.changeName('Mateus Santos')  
        await customerRepository.update(customer);  

        //act
        const updatedCustomer = await CustomerModel.findOne({where: {id:"1"}});

        //assert
        expect(updatedCustomer.toJSON())
        .toStrictEqual({
            id: "1",
            name: "Mateus Santos",
            number: 123,
            rewardPoints: 0,
            street: "Rua X",
            city: 'SP',
            active: '0',
            zipcode: "093032-203",
        });

    })

    it('should find a customer', async ()=>{

        //arrange
        const customerRepository = new CustomerRepository();

        const customer = new Customer('1', 'Mateus');
        const address = new Address('Rua X', 123, '093032-203', 'SP')
        customer.changeAddress(address);
        await customerRepository.create(customer);
        const customerModel = await CustomerModel.findOne({where: {id:"1"}});

        //act
        const findCustomer = await customerRepository.findById("1")

        //assert
        expect(customerModel.toJSON())
        .toStrictEqual({
            id: findCustomer.id,
            name: findCustomer.name,
            street: findCustomer.Address.street,
            number: findCustomer.Address.number,
            city: findCustomer.Address.city,
            active: '0',
            zipcode: findCustomer.Address.zip,
            rewardPoints: findCustomer.rewardPoints

        });
    })

    it('should find all customers', async ()=>{

        //arrange
        const customerRepository = new CustomerRepository();
        const address = new Address('Rua X', 123, '093032-203', 'SP')

        const customer1 = new Customer('1', 'Mateus1');
        customer1.changeAddress(address);

        const customer2 = new Customer('2', 'Mateus2');
        customer2.changeAddress(address);

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        //act
        const customers = await customerRepository.findAll()
        
        //assert
        expect(customers).toHaveLength(2)
      
    })
})