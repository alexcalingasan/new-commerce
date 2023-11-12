import mongoose from "mongoose";

let connection : typeof mongoose;

const url = 'mongodb+srv://admin:admin@cluster0.qqwvsqy.mongodb.net/';

const startDb = async () => {
    try {
        if (!connection) 
            connection = await mongoose.connect(url);

        return connection;

    } catch (error) {
        throw new Error((error as any).message);
    }
}

export default startDb;

