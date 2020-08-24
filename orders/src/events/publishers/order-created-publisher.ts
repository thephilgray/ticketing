import { OrderCreatedEvent, Publisher, Subjects } from '@thepgticketing/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
