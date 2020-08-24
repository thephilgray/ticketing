import mongoose from 'mongoose';
import { Message } from 'node-nats-streaming';
import { natsWrapper } from './../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { TicketUpdatedEvent } from '@thepgticketing/common';
import { TicketUpdatedListener } from './../ticket-updated-listener';
const setup = async () => {
    // create a listener
    const listener = new TicketUpdatedListener(natsWrapper.client);
    // create and save a ticket
    const ticket = Ticket.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        title: 'concert',
        price: 20
    });

    await ticket.save();

    // create a fake data obj

    const data: TicketUpdatedEvent['data'] = {
        title: 'new concert',
        id: ticket.id,
        price: 999,
        userId: "abcdefg",
        version: ticket.version + 1,
    }

    // create a fake msg object

    // @ts-ignore
    const msg: Message = {
        ack: jest.fn()
    }

    // return all of this stuff
    return { msg, data, ticket, listener }
}


it('finds, updates, and saves a ticket', async () => {
    const { msg, data, ticket, listener } = await setup();

    await listener.onMessage(data, msg);

    const updatedTicket = await Ticket.findById(ticket.id);

    expect(updatedTicket!.title).toEqual(data.title);
    expect(updatedTicket!.price).toEqual(data.price);
    expect(updatedTicket!.version).toEqual(data.version);

});


it('acks the mssage', async () => {

    const { msg, data, listener } = await setup();

    await listener.onMessage(data, msg);

    expect(msg.ack).toHaveBeenCalled();

});


it('does not call ack if the event has a skipped version number', async () => {
    const { msg, data, listener } = await setup();

    try {
        await listener.onMessage({ ...data, version: 10 }, msg);
    } catch (error) {

    }

    expect(msg.ack).not.toHaveBeenCalled();

});