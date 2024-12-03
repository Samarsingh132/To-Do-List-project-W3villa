import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signin,setsignin]=useState(true);
  
    // const submitHandler = (e) => {
    //   e.preventDefault()
    //   handleLogin(email , password)
  
    //   setEmail("")
    //   setPassword("")
    // } 
    return <>
      {signin?<div className='flex h-screen w-screen bg-black items-center justify-center'>
          <div className='border-2 p-20 border-emerald-500 rounded-xl '>
              {/* <form 
              onSubmit= {(e) =>{
                  submitHandler(e);
                }}
              className='flex flex-col items-center justify-center m-6'> */}
              <div className='flex flex-col items-center justify-center m-6'>
              <input 
                  value={email}
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }
                  }
                  required className='border-2 border-emerald-500 outline-none text-red-500 placeholder:text-gray-400 bg-transparent text-xl px-5 py-4 rounded-full mt-4 ' type='text' placeholder='Enter your Username' />
                  <input
                  value={password}
                  onChange={(e)=>{
                    setPassword(e.target.value);
                  }}
                  required className='border-2 border-emerald-500 outline-none text-red-500 px-5 py-4 text-xl rounded-full  placeholder:text-gray-400 bg-transparent mt-4 ' type='password' placeholder='Enter password'/>
                  <button onClick={async ()=>{
                    const user=await axios.post('http://localhost:3000/users/signin',{
                      username: email,
                      password: password
                    }).then((response)=>{
                      localStorage.setItem('token','Bearer '+response.data.token);
                      localStorage.setItem('username',email);
                      navigate('/Todo');
                    })
                  }} className='border-2 bg-emerald-500 border-none outline-none text-white px-5 py-4 text-xl rounded-full  placeholder:text-white mt-4 ' >Sign in</button>
                  <button onClick={()=>{
                    setsignin(false);
                  }} className='text-white mt-2'>Don't have an account? Signup</button>
              </div>
                  
              
          </div>
      </div>:<div className='flex h-screen w-screen bg-black items-center justify-center'>
          <div className='border-2 p-20 border-emerald-500 rounded-xl '>
              {/* <form 
              onSubmit= {(e) =>{
                  submitHandler(e);
                }}
              className='flex flex-col items-center justify-center m-6'> */}
              <div className='flex flex-col items-center justify-center m-6'>
              <input 
                  value={email}
                  onChange={(e)=>{
                    setEmail(e.target.value);
                  }
                  }
                  required className='border-2 border-emerald-500 outline-none text-red-500 placeholder:text-gray-400 bg-transparent text-xl px-5 py-4 rounded-full mt-4 ' type='text' placeholder='Enter your Username' />
                  <input
                  value={password}
                  onChange={(e)=>{
                    setPassword(e.target.value);
                  }}
                  required className='border-2 border-emerald-500 outline-none text-red-500 px-5 py-4 text-xl rounded-full  placeholder:text-gray-400 bg-transparent mt-4 ' type='password' placeholder='Enter password'/>
                  <button onClick={async ()=>{
                    const user=await axios.post('http://localhost:3000/users/signup',{
                      username: email,
                      password: password
                    }).then((response)=>{
                      localStorage.setItem('token',"Bearer "+response.data.token);
                      localStorage.setItem('username',email);
                      navigate('/Todo');
                    })
                  }} className='border-2 bg-emerald-500 border-none outline-none text-white px-5 py-4 text-xl rounded-full  placeholder:text-white mt-4 ' >Sign up</button>
                  <button onClick={()=>{
                    setsignin(true);
                  }} className='text-white mt-2'>already have an account? Signin</button>
              </div>
                  
             
          </div>
      </div>}
    </>
      
}

export default Login
















// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [signin, setSignin] = useState(true);
//   const navigate = useNavigate();

//   const handleSignIn = async () => {
//     try {
//       const response = await axios.post('http://localhost:3000/users/signin', {
//         username: email,
//         password: password,
//       });
//       // Example: Save token to local storage
//       // localStorage.setItem('token', response.data.token);
//       navigate('/Todo');
//     } catch (error) {
//       console.error('Error signing in:', error.message);
//     }
//   };

//   return (
//     <>
//       {signin ? (
//         <div className='flex h-screen w-screen bg-black items-center justify-center'>
//           <div className='border-2 p-20 border-emerald-500 rounded-xl'>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className='border-2 border-emerald-500 outline-none text-red-500 placeholder:text-gray-400 bg-transparent text-xl px-5 py-4 rounded-full mt-4'
//               type='text'
//               placeholder='Enter your Username'
//             />
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className='border-2 border-emerald-500 outline-none text-red-500 px-5 py-4 text-xl rounded-full placeholder:text-gray-400 bg-transparent mt-4'
//               type='password'
//               placeholder='Enter password'
//             />
//             <button
//               onClick={handleSignIn}
//               className='border-2 bg-emerald-500 border-none outline-none text-white px-5 py-4 text-xl rounded-full placeholder:text-white mt-4'
//             >
//               Sign in
//             </button>
//             <button
//               onClick={() => setSignin(false)}
//               className='text-white mt-2'
//             >
//               Don't have an account? Signup
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div className='flex h-screen w-screen bg-black items-center justify-center'>
//           <div className='border-2 p-20 border-emerald-500 rounded-xl'>
//             <input
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//               className='border-2 border-emerald-500 outline-none text-red-500 placeholder:text-gray-400 bg-transparent text-xl px-5 py-4 rounded-full mt-4'
//               type='text'
//               placeholder='Enter your Username'
//             />
//             <input
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//               className='border-2 border-emerald-500 outline-none text-red-500 px-5 py-4 text-xl rounded-full placeholder:text-gray-400 bg-transparent mt-4'
//               type='password'
//               placeholder='Enter password'
//             />
//             <button
//               className='border-2 bg-emerald-500 border-none outline-none text-white px-5 py-4 text-xl rounded-full placeholder:text-white mt-4'
//             >
//               Sign up
//             </button>
//             <button
//               onClick={() => setSignin(true)}
//               className='text-white mt-2'
//             >
//               Already have an account? Signin
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Login;

