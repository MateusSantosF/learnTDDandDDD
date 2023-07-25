import IEvent from "../@shared/IEvent";

export default class ProductCreatedEvent implements IEvent{
    
    dateTimeOccurred: Date;
    eventData: any;

    constructor(eventData:any){
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}