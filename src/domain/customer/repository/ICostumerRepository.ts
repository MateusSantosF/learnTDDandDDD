import Customer from "../entity/Customer";
import IRepository from "../../@shared/repository/IRepository";

export default interface ICustomerRepository extends IRepository<Customer>{
}