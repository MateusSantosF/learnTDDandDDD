import Customer from "./Customer"

describe('Customer unit tests', ()=>{

    it('should add reward points', ()=>{

        const customer = new Customer('1', 'customer1')
        expect(customer.rewardPoints).toBe(0)
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20)
    })
})