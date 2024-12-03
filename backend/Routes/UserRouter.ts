import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';


dotenv.config();

const prisma = new PrismaClient()
const Userrouter=express.Router();

const Secret=process.env.JWT_SECRET;

Userrouter.post('/signup',async (req:any,res:any)=>{
    const username=req.body.username;
    const password=req.body.password;

    const user=await prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if(user){
        return res.json({
            msg: "username already exist"
        })
    }
    
    const hash_password=await bcrypt.hash(password,10);

    try{
        const User=await prisma.user.create({data: {
            username: username,
            password: hash_password
        }})

        const token = jwt.sign({username},Secret as string);
        return res.json({token : token});
    }catch(e){
        console.log(e);
        return res.status(500).json({error : "something went wrong"});
    }

})


Userrouter.post('/signin',async(req:Request,res:any)=>{
    const username=req.body.username;
    const password=req.body.password;

    
    const user=await prisma.user.findFirst({
        where: {
            username: username
        }
    })

    if(!user){
        return res.status(500).json({msg: "user didn't exist"});
    }

    const password_match=await bcrypt.compare(password,user.password);
    

    if(!password_match){
        return res.status(401).json({msg: "incorrect password"});
    }

    const token = jwt.sign({username},Secret as string);

    return res.json({token});

    
})


Userrouter.use((req:Request,res:any,next:NextFunction)=>{
    let token=req.headers.authorization;
    token=token?.replace('Bearer ','');
    
    if(!token){
        return res.status(401).json({msg: "No token"});
    }
    try{
        const isauth=jwt.verify(token,process.env.JWT_SECRET as string);
        
        next();
    }catch(e){
        return res.status(403).json({msg: "not authenticated"});
    }
})

Userrouter.get('/check',async (req,res)=>{
    res.send("loggedin");
})


export default Userrouter;