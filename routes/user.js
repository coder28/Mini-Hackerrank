const express=require('express')
const router= new express.Router()
const User=require('../models/user')                    
const mongoose=require('mongoose')
const auth=require('../middleware/auth')

router.post('/signup',async(req,res)=>{
    const user=new User(req.body)
    try{
        await user.save()
    }catch(e){
        res.status(400).send(e)
    }
})


router.post('/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        if(user.active==false){
            return res.status(401).send('Email verification pending.')
        }
        var data={
            loggedin:true,
            token:token,
            email:user.email,
            regno:user.regno,
            name:user.name
        }
        res.status(200).send(data)
    }catch(e){
        res.status(400).send(e)
    }


})

router.post('/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send('Logged out successfully')
    }catch(e){
        res.status(500).send('Logout Error!')
    }
})


router.get('/',(req,res)=>{
    res.send('Hello from ADG')
})

module.exports=router