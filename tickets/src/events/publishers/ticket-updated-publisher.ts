import { Publisher, Subjects, TicketUpdatedEvent } from '@thepgticketing/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    readonly subject = Subjects.TicketUpdated;
}