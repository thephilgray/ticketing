import { Subjects } from './subjects';
import { TicketCreatedEvent } from './ticket-created-events';
import { Publisher } from "./base-publisher";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}