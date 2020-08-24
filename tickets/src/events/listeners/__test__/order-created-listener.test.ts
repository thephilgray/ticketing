import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from './../../../nats-wrapper';
import { OrderCreatedEvent, OrderStatus } from '@thepgticketing/common';
import { OrderCreatedListener } from './../order-created-listener';
import { Ticket } from '../../../models/ticket';
const setup = async () => {
    // create an istance of the listener

    const listener = new OrderCreatedListener(natsWrapper.client);
    const ticket = Ticket.build({
        title: 'concert',
        price: 99,
        userId: 'abcd'
    })

    await ticket.save();

    // create fake data event

    const data: OrderCreatedEvent['data'] = {
        id: mongoose.Types.ObjectId().toHexString(),
        version: 0,
        status: OrderStatus.Created,
        userId: 'abcd',
        expiresAt: 'abcd',
        ticket: {
            id: ticket.id,
            price: ticket.price
        }
    }

    // fake meg object
    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    return { listener, ticket, data, msg }
}

it('sets the userId of the ticket', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.orderId).toEqual(data.id)
});


it('acks the message', async () => {
    const { listener, ticket, data, msg } = await setup();

    await listener.onMessage(data, msg);
    expect(msg.ack).toHaveBeenCalled();
});

it('publishes a ticket updated event', async () => {
    const { ticket, listener, data, msg } = await setup();

    await listener.onMessage(data, msg);

    expect(natsWrapper.client.publish).toHaveBeenCalled();

    const ticketUpdatedData = JSON.parse((natsWrapper.client.publish as jest.Mock).mock.calls[0][1]);

    expect(data.id).toEqual(ticketUpdatedData.orderId);

});