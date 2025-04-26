const User=require('../models/User')
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.signup=async (req,res)=>{
    try{
        const {name,email,password,country}=req.body;
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashedPassword,country});
        res.status(201).json(user);
    }
    catch(err){
        res.status(400).json({message:err.message})
    }
}

exports.login=async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user) return res.status(404).json({message:'User not found'});

        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.status(400).json({message:'Invalid credentials'});
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});
        res.json({token});
    }
    catch(err){
       res.status(500).json({message:err.message});
    }
}