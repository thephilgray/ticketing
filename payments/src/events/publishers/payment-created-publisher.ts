import { Subjects, Publisher, PaymentCreatedEvent } from '@thepgticketing/common';


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}