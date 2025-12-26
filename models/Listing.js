import mongoose from 'mongoose';


const listingSchema = new mongoose.Schema({

     Title:{
         type:String,
         maxLength:100,
           required :true,
           trim:true
     },
     Description:{
       type:String,
       maxLength:500,
       required:true,
       trim:true
        },
        price:{
            type:Number,
            required:true
        },
        Address:{
             type:String,
             required:true
        },
        City:{
            type:String,
            required:true
        },
        Contact:{
            type:Number,
            required:true
        },
        Image:{
            type:String,
            required:true,
        },
        Owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"User",
            // required:true
        },
        
      
        createdAt: {
            type: Date,
            default: Date.now,
          },
          updatedAt: {
            type: Date,
            default: Date.now,
          },

    

     
    
})

const Listing = mongoose.model('Listing',listingSchema)
export default Listing