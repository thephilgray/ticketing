import { ExpirationCompleteEvent, Publisher, Subjects } from '@thepgticketing/common';


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete

}