import React from 'react';
import LoginForm from './axios/LoginForm';
import Post from './post/post';
import { BrowserRouter, Route, Routes } from "react-router-dom";


function App() {


  return (
    
   
    <Routes>
    <Route path='/' element={<LoginForm />}/>
    <Route path='/post' element={<Post />}/>
      
    </Routes>
     
  );
}

export default App;


