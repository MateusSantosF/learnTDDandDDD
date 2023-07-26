import { v4 as uuid } from "uuid";
import Iproduct from "../entity/IProduct";
import Product from "../entity/Product";
import ProductB from "../entity/ProductB";

export default class ProductFactory{

    public static create(type:String, name:string, price:number): Iproduct{

        switch(type){
            case "a":{
                return new Product(uuid(), name, price);
            }
            case "b":{
                return new ProductB(uuid(), name,price);
            }
            default:{
                throw new Error('Product type not supported.')
            }
        }
    }
}