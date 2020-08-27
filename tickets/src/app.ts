import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { createTicketRouter } from './routes/new';
import { currentUser, errorHandler, NotFoundError } from '@thepgticketing/common';
import { indexTicketRouter } from './routes';
import { showTicketRouter } from './routes/show';
import { updateTicketRouter } from './routes/update';

const app = express();
app.set('trust proxy', true);
app.use(express.json());
app.use(
    cookieSession({
        signed: false,
        secure: false
    })
)

app.set('port', process.env.port || 3000);

app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);

app.all('*', () => {
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };