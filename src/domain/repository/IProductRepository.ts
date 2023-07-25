import Product from "../entity/Product";
import IRepository from "./IRepository";

export default interface IProductRepository extends IRepository<Product>{
}