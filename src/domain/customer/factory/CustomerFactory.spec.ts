import Address from "../value-object/Address";
import CustomerFactory from "./CustomerFactory";


describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    let customer = CustomerFactory.create("Mateus");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Mateus");
    expect(customer.Address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const address = new Address("Street", 1, "13330-250", "São Paulo");

    let customer = CustomerFactory.createWithAddress("Mateus", address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Mateus");
    expect(customer.Address).toBe(address);
  });
});