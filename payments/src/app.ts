import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { createChargeRouter } from './routes/new';
import { currentUser, errorHandler, NotFoundError } from '@thepgticketing/common';


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

app.use(createChargeRouter);

app.all('*', async () => {
    throw new NotFoundError()
})

app.use(errorHandler);

export { app };