import { Listener, Subjects, TicketUpdatedEvent } from '@thepgticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queueGroupName';
import { Ticket } from '../../models/ticket';

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
    queueGroupName = queueGroupName;

    async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
        const { title, price, id } = data;
        const ticket = await Ticket.findByEvent(data);

        if (!ticket) {
            return new Error('Ticket not found');
        }

        ticket.set({ title, price })
        await ticket.save();

        msg.ack();
    }
}