import Product from "../entity/Product";

export default class ProductService{

    static increasePrice(products: Product[], percentage: number): Product[]{
        products.forEach(p =>{
            p.changePrice((p.price * percentage)/100 + p.price)
        })

        return products;
    }
}