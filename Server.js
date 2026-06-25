const express = require('express');
const mongoose = require('mongoose');
const User = require('./model');
const bcrypt = require('bcrypt')

const app = express();

app.use(express.json());

mongoose.connect('').then(
    ()=> console.log('connected to database.......')
).catch(err=>console.log(err))

app.post('/signup', async (req,res)=>{
    const {username}= req.body
    const {email}= req.body
    const {password}= req.body
    try{
         //hash password
         const salt = await bcrypt.genSalt(10);
         const hashed_password =await bcrypt.hash(password,salt)

         const newUser = new User({username,email,password:hashed_password})
         await newUser.save()
         return res.status(200).json("user signup successfully")
    }
    catch(err){
        console.log(err.message)
    }
} )

app.listen(3000,()=>console.log('server running on http://127.0.0.1:3000.....'))
