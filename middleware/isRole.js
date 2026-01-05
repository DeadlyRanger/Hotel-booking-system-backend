import isAuth from './isAuth.js';


const isRole = (req,res,next)=>{
     
    if(req.user.role != 'admin') return res.status(401).json({message:'Unauthorized',success:false})

     next()

}

export default isRole;