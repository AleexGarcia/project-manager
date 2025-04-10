import { connect, disconnect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URI as string);
        console.log('MongoDbConectado');
    } catch (error) {
        console.log('Erro ao conectar ao MongoDB', error);
    }
}
