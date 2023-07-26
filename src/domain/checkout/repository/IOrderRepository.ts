
import Order from "../entity/Order";
import IRepository from "../../@shared/repository/IRepository";

export default interface ICustomerRepository extends IRepository<Order>{
}