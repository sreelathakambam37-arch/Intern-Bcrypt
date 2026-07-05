const express = require('express');
const mongoose = require('mongoose');
const User = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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
        if (!email || !password || !username) {
            return res.json({message:"username,email and password are required"});
        }
         //hash password
         const salt = await bcrypt.genSalt(10);
         const hashed_password =await bcrypt.hash(password,salt);

         const newUser = new User({username,email,password:hashed_password})
         await newUser.save();
         const token = jwt.sign({id:newUser._id},'this is my secret key',{expiresIn:'1h'});   
         return res.status(200).json({message:"user signup successfully",
            token,
            user:{
                id:newUser._id,
                username:newUser.username,
                email:newUser.email
            }
         });
        
    } 
    catch(err){
        console.log(err.message)
    }
} )

app.post("/login", async (req,res)=>{
    const {email}=req.body
    const {password}=req.body
    try{
        if (!email || !password) {
            return res.json({message:"Email and password are required"});
        }
        
        const findUser = await User.findOne({email});
        if (!findUser) {
            return res.json({message:"user not found"});
        }

        const isMatch = await bcrypt.compare(password,findUser.password)
        if(!isMatch){
          return res.json({message:"invalid password"});
        }
        const token = jwt.sign({id:findUser._id},'this is my secret key',{expiresIn:'1h'});
        return res.json({
            message: "login successfully",
            token:token,
            user:{
                id:findUser._id,
                username:findUser.username,
                email:findUser.email
                
            }
        })
    }
    catch(err){
        console.log(err.message)
    }
})

app.listen(3000,()=>console.log('server running on http://127.0.0.1:3000.....'))
