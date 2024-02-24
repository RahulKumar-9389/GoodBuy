// IMPORT REQUIRED PACKAGES
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js';
import productRoute from './routes/productRoute.js';



const app = express();
dotenv.config();

//PORT
const PORT = process.env.PORT || 4000;


// middlewares
app.use(express.json());
app.use(cors());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/product', productRoute);


// connect with db
connectDB();

app.listen(PORT, function () {
    console.log(`Server is running at port ${PORT}`);
});