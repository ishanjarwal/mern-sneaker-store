import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { connect } from './connection.js';
import productRouter from './routes/productRouter.js';
const app = express();
import cors from "cors"
import brandRouter from './routes/brandRouter.js';
import categoryRouter from './routes/categoryRouter.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cartRouter from './routes/cartRouter.js';
import userRouter from './routes/userRouter.js';
import cookieParser from 'cookie-parser';
import wishlistRouter from './routes/wishlistRouter.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

// db connection
connect()
    .then(val => { console.log("DB Connection Successful") })
    .catch(err => { console.log(err) })


// middlewares
app.use(express.json()) // for reading body data
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'))

// this line we add to make react router work in case of other routes doesnt match
app.get(/^(?!\/api\/).*/, (req, res) =>
    res.sendFile(path.resolve('dist', 'index.html'))
);


// endpoints
app.use('/api/product', productRouter)
app.use('/api/brand', brandRouter)
app.use('/api/category', categoryRouter)
app.use('/api/cart', cartRouter)
app.use('/api/wishlist', wishlistRouter)
app.use('/api/user', userRouter)



app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Server Listening on Port 8080");
    }
})