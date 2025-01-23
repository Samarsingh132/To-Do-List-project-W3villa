import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Main = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [mainTask, setMainTask] = useState([]);
    const [editIndex, setEditIndex] = useState(null); // To track the task being edited

    useEffect(() => {
        axios.post('http://localhost:3000/task/getTodo', {
            "username": localStorage.getItem('username')
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        }).then((response) => {
            setMainTask(response.data);
        });
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            // Update existing task
            const updatedTask = { ...mainTask[editIndex], title, desc };
            axios.post('http://localhost:3000/task/updateTodo', {
                "username": localStorage.getItem('username'),
                taskid: mainTask[editIndex].id,
                title,
                desc
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then(() => {
                const updatedTasks = [...mainTask];
                updatedTasks[editIndex] = updatedTask;
                setMainTask(updatedTasks);
                setEditIndex(null);
                setTitle("");
                setDesc("");
            });
        } else {
            // Add new task
            axios.post('http://localhost:3000/task/todoAdd', {
                title,
                desc,
                "username": localStorage.getItem('username')
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            }).then((response) => {
                setMainTask([...mainTask, { id: response.data.id, title, desc }]);
                setTitle("");
                setDesc("");
            });
        }
    };

    const deleteHandler = async (i) => {
        await axios.post('http://localhost:3000/task/delTodo', {
            "username": localStorage.getItem('username'),
            taskid: mainTask[i].id
        }, {
            headers: {
                Authorization: localStorage.getItem('token')
            }
        });
        const updatedTasks = [...mainTask];
        updatedTasks.splice(i, 1);
        setMainTask(updatedTasks);
    };

    const updateHandler = (i) => {
        setEditIndex(i);
        setTitle(mainTask[i].title);
        setDesc(mainTask[i].desc);
    };

    let renderTask = <h2>No Task Available</h2>;

    if (mainTask.length > 0) {
        renderTask = mainTask.map((t, i) => {
            return (
                <li key={i} className='flex items-center justify-between mb-5'>
                    <div className='flex items-center justify-between w-2/3'>
                        <h5 className='text-2xl font-semibold'>{t.title}</h5>
                        <h6 className='text-lg font-medium'>{t.desc}</h6>
                    </div>
                    <button
                        onClick={() => deleteHandler(i)}
                        className='bg-red-400 text-white px-4 py-2 rounded font-bold'>Delete</button>
                    <button
                        onClick={() => updateHandler(i)}
                        className='bg-blue-400 text-white px-4 py-2 rounded font-bold ml-[-250px]'>Update</button>
                </li>
            );
        });
    }

    return (
        <>
            <h1 className='bg-black text-white p-5 text-5xl text-center'>{localStorage.getItem('username')} Todo List</h1>
            <form onSubmit={submitHandler}>
                <input type='text' placeholder='Enter Title Here' className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2'
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                />
                <input type='text' placeholder='Enter Description Here' className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2'
                    value={desc}
                    onChange={(e) => {
                        setDesc(e.target.value);
                    }}
                />
                <button type='submit' className='font-semibold bg-black text-white text-2xl px-3 py-2 rounded hover:bg-gray-800 m-5'>
                    {editIndex !== null ? 'Update Task' : 'Add Task'}
                </button>
            </form>
            <hr />
            <div className='p-8 bg-slate-300'>
                <ul>
                    {renderTask}
                </ul>
            </div>
        </>
    );
};

export default Main;
