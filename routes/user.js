const express=require('express')
const router= new express.Router()
const User=require('../models/user')                    
const mongoose=require('mongoose')
const auth=require('../middleware/auth')

router.post('/signup',async(req,res)=>{
    const user=new User(req.body)
    console.log(user)
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
    res.send('Coding Portal!!')
})

router.get('/dashboard', (req,res) => {
    res.send('All Questions!!')
})

module.exports=router