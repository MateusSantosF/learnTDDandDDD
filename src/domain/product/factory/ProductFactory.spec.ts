import ProductFactory from "./ProductFactory";

describe('ProductFactory unit tests', ()=>{


    it('should create a normal product', ()=>{

        const product = ProductFactory.create('a', "Product A", 1);

        expect(product.id).toBeDefined();
        expect(product.price).toBe(1);
        expect(product.name).toBe("Product A");
        expect(product.constructor.name).toBe('Product');
    })


    it('should create a productB', ()=>{

        const product = ProductFactory.create('b', "Product B", 1);

        expect(product.id).toBeDefined();
        expect(product.price).toBe(2);
        expect(product.name).toBe("Product B");
        expect(product.constructor.name).toBe('ProductB');
    })

    it('should throw product type invalid', ()=>{
 
        expect(()=>ProductFactory.create('c', "Product c", 1))
            .toThrowError('Product type not supported.')

    })
})