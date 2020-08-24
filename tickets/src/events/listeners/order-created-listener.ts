import { Listener, OrderCreatedEvent, Subjects } from '@thepgticketing/common';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Ticket } from '../../models/ticket';
import { TicketUpdatedPublisher } from './../publishers/ticket-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
    queueGroupName = queueGroupName;

    async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
        // Find the ticket that the order is reserving
        const ticket = await Ticket.findById(data.ticket.id);
        // if no ticket, throw error

        if (!ticket) {
            throw new Error('Ticket not found.');
        }

        // mark ticket as reserved by setting orderId prop

        ticket.set({ orderId: data.id });

        // save ticket
        await ticket.save();

        // ack message
        new TicketUpdatedPublisher(this.client).publish({
            id: ticket.id,
            price: ticket.price,
            title: ticket.title,
            userId: ticket.userId,
            orderId: ticket.orderId,
            version: ticket.version
        })
        msg.ack();
    }
}