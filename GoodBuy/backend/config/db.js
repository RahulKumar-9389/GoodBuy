import mongoose from "mongoose";

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database connected successfully!');
    } catch (error) {
        console.log(`Error while connect DB : ${error.message}`);
    }
};


export default connectDB;