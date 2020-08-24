import { OrderCancelledEvent, Publisher, Subjects } from '@thepgticketing/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
