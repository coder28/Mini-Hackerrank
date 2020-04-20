const jwt=require('jsonwebtoken')
const User=require('../models/user')


const auth=async(req,res,next)=>{
    try{
        const token=req.header('Authorization').replace('Bearer ','')
        const decoded=jwt.verify(token,'thisisasecretformyapp')
        const user=await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error('No user Found')
        }
        req.user=user
        req.token=token
        req.data=req.body
        next()
        
    }catch(e){
        res.status(401).send('Not Authorised')

    }
}

module.exports=auth