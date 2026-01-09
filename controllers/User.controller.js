import User from './../models/User.js';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()


const register = async(req,res)=>{
     const{name,email,password , role } = req.body;
       
      try{
          const existingUser  = await User.findOne({email});
               
          if(existingUser) return res.status(400).json({message:'User is already registered', success:false})

             const hashedPassword = await bcrypt.hash(password,10);
            const user =  new User({name,email,password :hashedPassword , role : role || 'user' });
                           await user.save();

            res.status(200).json({message:'User registered successfully',success:true,user})

      }
      catch(err){
          res.status(500).json({message:err.message,success:false})
      }
}

const login = async(req,res)=>{
     
    const {email , password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(404).json({message:'User not found',success:false})
            
            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch) return res.status(400).json({message:'Invalid credentials',success:false})

                const token = jwt.sign({
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    role:user.role
                },process.env.JWT_SECRET);

             res.cookie("token", token, {
  httpOnly: true,
  secure: true,        // true in production (https)
  sameSite: "lax"
});


                res.json({
                    message:'User logged in successfully',
                    success:true,
                    user
                })

                }

    catch(err){
    
        res.status(500).json({message:err.message,success:false})
    }
    }

const logout = async(req,res)=>{
    try{
         res.cookie('token',null,{expires: new Date(Date.now())});
         res.status(200).json({message:'User logged out successfully',success:true})
    }
    catch{
        res.status(500).json({message:err.message,success:false})
    }
}

const Profile  = async(req,res)=>{
    
     try{
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json({message:'User profile fetched successfully',success:true,user})

     }
     catch(err){
        res.status(500).json({message:err.message,success:false})
     }
}

    const  userController = {login ,register,logout,Profile};
    export default userController;