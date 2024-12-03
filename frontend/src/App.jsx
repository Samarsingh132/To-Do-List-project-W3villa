import React from 'react'
import Main from './pages/Main';
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
  return <>
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/Todo' element={<Main/>}/>
      </Routes>
    </Router>
  </>
  
}

export default App