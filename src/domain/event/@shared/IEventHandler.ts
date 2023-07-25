import IEvent from "./IEvent";

export default interface IEventHandler <T extends IEvent=IEvent>{
    handle(event: T) : void;
}