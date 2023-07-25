import { Sequelize } from "sequelize-typescript"
import ProductModel from "../db/sequelize/model/ProductModel";
import Product from "../../domain/entity/Product";
import ProductRepository from "./ProductRepository";

describe('ProductRepository unit tests', () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })
        sequelize.addModels([ProductModel])
        await sequelize.sync();
    })


    afterEach(async () => {
        await sequelize.close()
    })  


    it('should create a product', async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product('1', 'product1', 10);
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: {id:"1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "product1",
            price:10
        });
    })

    it('should update a product', async()=>{
        const productRepository = new ProductRepository();

        const product = new Product('1', 'product1', 10);
        await productRepository.create(product);
        const productModel = await ProductModel.findOne({where: {id:"1"}});

        expect(productModel.toJSON()).toStrictEqual({
            id: "1",
            name: "product1",
            price:10
        });

        product.changeName('product2')
        product.changePrice(20)

        await productRepository.update(product);  
        const updatedProduct = await ProductModel.findOne({where: {id:"1"}});

        expect(updatedProduct.toJSON()).toStrictEqual({
            id: "1",
            name: "product2",
            price:20
        });

    })

    it('should find a product', async ()=>{
        const productRepository = new ProductRepository();

        const product = new Product('1', 'product1', 10);
        await productRepository.create(product);

        const productModel = await ProductModel.findOne({where: {id:"1"}});
        const findProduct = await productRepository.findById("1")

        expect(productModel.toJSON()).toStrictEqual({
            id: findProduct.id,
            name: findProduct.name,
            price: findProduct.price
        });
    })

    it('should find all product', async ()=>{
        const productRepository = new ProductRepository();

        const product1 = new Product('1', 'product1', 10);
        const product2= new Product('2', 'product2', 20);

        await productRepository.create(product1);
        await productRepository.create(product2);

        const findProducts = await productRepository.findAll()
        const products = [product1, product2]
        

        expect(products).toEqual(findProducts)

    })
})