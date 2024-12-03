import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken';

const TodoRouter=express.Router();
const prisma = new PrismaClient()

TodoRouter.use((req:Request,res:any,next:NextFunction)=>{
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

TodoRouter.post('/todoAdd',async(req:Request,res:any)=>{
    const title=req.body.title;
    const desc=req.body.desc;
    

    const user=await prisma.user.findFirst({
        where: {
            username: req.body.username
        }
    })

    try{
        const post=await prisma.task.create({
            data: {
                title: title,
                desc: desc,
                isDone: false,
                user: {
                    connect: {
                        id: user?.id
                    }
                }
            }
        })
    }catch(e){
        console.log(e);
        return res.json({msg:"todo not added"});
    }
    
    return res.send("Todo added Successfully");

})

TodoRouter.post('/getTodo',async (req:Request,res:any)=>{
    const user=await prisma.user.findFirst({
        where: {
            username: req.body.username,
        }
    })

    try{
        const tasks=await prisma.task.findMany({
            where: {
                userid: user?.id,
                isDone: false
            }
        })
        return res.send(tasks);
    }catch(e){
        console.log(e);
        return res.send("something went wrong");
    }
})

TodoRouter.post('/delTodo',async (req:any,res:any)=>{
    try{
        const del=await prisma.task.delete({
            where: {
                id: req.body.taskid
            }
        })
        return res.json({del});
    }catch(e){
        console.log(e);
        return res.send("something went wrong");
    }

})

export default TodoRouter;