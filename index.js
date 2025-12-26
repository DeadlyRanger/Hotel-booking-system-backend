import express from 'express'
import dbConnect from './config/db.js';
import router from './routes/Listing.routes.js';

const app = express();

const port = 3000;

app.use(express.json());

app.use('/api',router);

app.listen(port,()=>{
     console.log(`server is running on port ${port}`);
     dbConnect();
})