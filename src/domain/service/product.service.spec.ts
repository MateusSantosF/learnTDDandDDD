import Product from "../entity/Product"
import ProductService from "./ProductService";

describe("Product Service unit tests", ()=>{

    it("Should change the price all products", ()=>{

        const product01 = new Product("1", "Product 1", 10);
        const product02 = new Product("2", "Product 2", 20);
        const products = [product01, product02];

        ProductService.increasePrice(products, 100);

        expect(product01.price).toBe(20);
        expect(product02.price).toBe(40)

    })
})