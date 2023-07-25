import Customer from "../entity/Customer";

import IRepository from "./IRepository";

export default interface ICustomerRepository extends IRepository<Customer>{
}