import React,{useEffect} from 'react'
import axios from 'axios'
import { useState } from 'react'

const Main = () => {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [mainTask, setMainTask] = useState([])
  
    useEffect(()=>{
      axios.post('http://localhost:3000/task/getTodo',{
        "username": localStorage.getItem('username')
      },{headers: {
         Authorization: localStorage.getItem('token')
      }}).then((response)=>{
        setMainTask(response.data);
      });
    },[])
  
    const submitHandler = (e)=>{
      e.preventDefault()
      setMainTask([...mainTask, {title , desc }])
      console.log(mainTask);
  
      setTitle("")
      setDesc("")
    }
  
    const deleteHandler =async (i)=>{
      const deltask=await axios.post('http://localhost:3000/task/delTodo',{
        "username": localStorage.getItem('username'),
        taskid: mainTask[i].id
      },{headers: {
        Authorization: localStorage.getItem('token')
      }})
      const updatedTasks=[...mainTask];
      updatedTasks.splice(i, 1);
      setMainTask(updatedTasks);
    }
  
    
  
    let renderTask =<h2>No Task Available</h2>
  
    if(mainTask.length>0){
      renderTask = mainTask.map((t,i)=>{
        return (
        <li key={i} className='flex items-center justify-between mb-5'>
          <div className='flex items-center justify-between w-2/3'>
            <h5 className='text-2xl font-semibold'>{t.title}</h5>
            <h6 className='text-lg font-medium'>{t.desc}</h6>
          </div>
          <button
          onClick={()=>{
            deleteHandler(i);
            // console.log(mainTask[0].id);
          }}
          className='bg-red-400 text-white px-4 py-2 rounded font-bold'>Delete</button>
        </li>  
        )
      })  
    }
  
    return (
      <>
      <h1 className='bg-black text-white p-5 text-5xl text-center font '>{localStorage.getItem('username')} Todo List</h1>
      <form onSubmit={submitHandler}>
        <input type='text' placeholder='Enter Title Here' className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' 
        value={title} 
        onChange={(e)=>{
          setTitle(e.target.value);
        }}
        />
        <input type='text' placeholder='Enter Description Here' className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' 
        value={desc}
        onChange={(e)=>{
          setDesc(e.target.value)
        }}
        />
        <button onClick={()=>{
          axios.post('http://localhost:3000/task/todoAdd',{
            title: title,
            desc: desc,
            "username": localStorage.getItem('username')
          },{headers: {
            Authorization: localStorage.getItem('token')
          }})
        }} className='font-semibold bg-black text-white text-2xl px-3 py-2 rounded hover:bg-gray-800 m-5'>Add Task</button>
      </form>
      <hr/>
      <div className='p-8 bg-slate-300'>
        <ul>
          {renderTask}
        </ul>
        </div>  
      </>
    )
}

export default Main
