import './App.css';
import {
  createBrowserRouter,RouterProvider,Route}from 'react-router-dom'
import { useState } from 'react';
import Nav from '../src/components/nav/Nav'
import Home from './pages/home/Home';
import Foooter from './components/footer/Foooter';

function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element : <>
      <Nav/>
      <Home/>
      <Foooter/>
      </>
    },
  ])

  return (
    <div className="App">
       <div className="app-container">
      <RouterProvider router={router} />
      </div> 

      
    </div>
  );
}

export default App;
