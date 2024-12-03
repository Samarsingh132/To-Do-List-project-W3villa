import express from 'express';
import Userrouter from './UserRouter';
import TodoRouter from './TodoRouter';
import cors from 'cors';

const app=express();
const port=3000;

app.use(cors());
app.use(express.json());

app.use('/users',Userrouter);
app.use('/task',TodoRouter);

app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})