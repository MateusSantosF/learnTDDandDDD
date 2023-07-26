import Product from "../../../../domain/product/entity/Product"
import IProductRepository from "../../../../domain/product/repository/IProductRepository"
import ProductModel from "./ProductModel"


export default class ProductRepository implements IProductRepository{

    async create(entity: Product): Promise<void> {
        await ProductModel.create({
            id: entity.id,
            name: entity.name,
            price: entity.price
        })
    }

    async update(entity: Product): Promise<void> {
        await ProductModel.update({
            name: entity.name,
            price: entity.price
        }, {
            where: {id: entity.id}
        })
    }

    async findById(id: string): Promise<Product> {
        const productModel =  await ProductModel.findOne({where: {id:id}})

        return new Product(
            productModel.id,
            productModel.name,
            productModel.price
        )
    }

    async findAll(): Promise<Product[]> {
        return (await ProductModel.findAll()).map( product=>{
            return new Product(
                product.id,
                product.name,
                product.price
            )
        })
    }

}