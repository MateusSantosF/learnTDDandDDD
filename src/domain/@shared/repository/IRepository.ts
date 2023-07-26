export default interface IRepository<T>{
    
    create(entity : T): Promise<void>;

    update(entity : T): Promise<void>;

    findById(string : string): Promise<T>;

    findAll(): Promise<T[]>

}