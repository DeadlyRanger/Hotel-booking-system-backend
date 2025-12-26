import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()


function dbConnect(){
     try{
             mongoose.connect(process.env.MONGO_URL)
             console.log('database connected');

     }
     catch(err){
 console.error(err.message);
     process.exit(1);
     }
}

export default dbConnect;