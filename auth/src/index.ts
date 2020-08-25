import mongoose from 'mongoose';
import { app } from "./app";

const start = async () => {
    console.log('starting...');
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined.');
    }
    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI is undefined');
    }
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('connected to mongodb');

    } catch (error) {
        console.error(error);
    }
}

app.listen(app.get('port'), () => {
    console.info(`Server listen on port ${app.get('port')}`);
})
start();
