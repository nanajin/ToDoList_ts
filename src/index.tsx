import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './Router';
import Test from './Test';
import ToDoList from './ToDoList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    {/* <ToDoList /> */}
    {/* <Test/> */}
    <Router/>
    {/* <Login/> */}
  </>
);
