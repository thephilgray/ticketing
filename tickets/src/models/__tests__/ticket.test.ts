import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async (done) => {
    // Create an instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    })

    // Save the ticket to the db
    await ticket.save();

    // fetch ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // make two separate changes to the tickets we fetched
    firstInstance?.set({ price: 10 });
    secondInstance?.set({ price: 15 })

    // save the first fetched ticket
    await firstInstance?.save();

    // save the second fetched ticket and expect an error
    try {
        await secondInstance!.save();

    } catch (error) {
        return done();
    }
});

it('increments the version number on multiple saves', async () => {
    // Create an instance of a ticket
    const ticket = Ticket.build({
        title: 'concert',
        price: 5,
        userId: '123'
    })

    // Save the ticket to the db
    await ticket.save();

    expect(ticket.version).toEqual(0);

    // Save the ticket to the db
    await ticket.save();

    expect(ticket.version).toEqual(1);
});