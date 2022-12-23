import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './auth/LoginForm';
import Home from './Home';

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/auth' element={<LoginForm/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;