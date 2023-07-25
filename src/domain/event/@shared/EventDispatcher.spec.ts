import ProductCreatedEvent from "../product/ProductCreatedEvent";

import SendEmailWhenProductCreateHandler from "../product/handler/SendEmailWhenProductCreatedHandler";
import EventDispatcher from "./EventDispatcher";

describe('Domain events tests', ()=>{

    it('should register event handler', ()=>{
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductCreateHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

    })

    it('should unregister event handler', ()=>{
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductCreateHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
    })

    it('should unregister all event handler', ()=>{
        
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductCreateHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler);
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll()
        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();

    })

    it('should notify all event handler', ()=>{
        
      
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductCreateHandler();
        const spyEventHandler = jest.spyOn(eventHandler, 'handle');

        eventDispatcher.register('ProductCreatedEvent', eventHandler);


        expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({email: 'teste@gmail.com'})

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    })
})