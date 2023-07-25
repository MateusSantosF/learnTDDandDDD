import Address from "../domain/entity/Address"


describe('Address unit tests ', ()=>{
    it('Address params dont be empty', ()=>{
        expect(()=>{
            new Address('', 123, '', '')
        }).toThrowError('Street is required')
    })
})
