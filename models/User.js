import mongoose  from "mongoose";


const userSchema = new mongoose.Schema ({
 
     name:{
          type:String,
          required:true,
     },
     email:{
         type:String,
         required:true,
         unique:true,
     },
     password:{
          type:String,
          required:true,
          minLength:8,
     },
     Listings:[
          {
               type: mongoose.Schema.Types.ObjectId,
               ref:"Listing",
          }
     ],
     Bookings:{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Booking",
     },
     role:{
        type:String,
        default:"user",
        enum:["admin","user"]
     },
     createdAt:{
         type:Date,
         default:Date.now
     }


},{timestamps:true});

const User = mongoose.model('User',userSchema);
export default User

