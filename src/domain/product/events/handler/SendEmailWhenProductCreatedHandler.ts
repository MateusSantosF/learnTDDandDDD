
import IEventHandler from "../../../@shared/event/IEventHandler";
import ProductCreatedEvent from "../ProductCreatedEvent";

export default class SendEmailWhenProductCreateHandler implements IEventHandler<ProductCreatedEvent>{
    
    handle(event: ProductCreatedEvent): void {
        console.log("Send email to " + event.eventData.email)
    }
}