import IEvent from "./IEvent";
import IEventDispatcher from "./IEventDispatcher";
import IEventHandler from "./IEventHandler";

export default class EventDispatcher implements IEventDispatcher{

    private eventsHandlers: { [eventName:string]: IEventHandler[]} = {}

    get getEventHandlers(): {[eventName:string] : IEventHandler[]}{
        return this.eventsHandlers;
    }

    notify(event: IEvent): void {
        const eventName = event.constructor.name;

        if(this.eventsHandlers[eventName]){
            this.eventsHandlers[eventName].forEach((e) =>{
                e.handle(event)
            })
        }
    }

    register(eventName: string, eventHandler: IEventHandler<IEvent>): void {
        if(!this.eventsHandlers[eventName]){
            this.eventsHandlers[eventName] = []
        }

        this.eventsHandlers[eventName].push(eventHandler)
    }

    unregister(eventName: string, eventHandler: IEventHandler<IEvent>): void {
        if(this.eventsHandlers[eventName]){
            const index = this.eventsHandlers[eventName].indexOf(eventHandler);
            this.eventsHandlers[eventName].splice(index, 1);
        }
    }

    unregisterAll(): void {
        this.eventsHandlers = {}
    }
}