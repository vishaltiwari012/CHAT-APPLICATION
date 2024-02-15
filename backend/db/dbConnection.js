import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI)
        console.log("Connect to DB successfully");
    } catch (error) {
        console.log("Error connection to Mongo DB", error.message);
    }
}

export default connectDB;