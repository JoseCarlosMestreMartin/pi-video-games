import { Route, Routes, useLocation } from 'react-router-dom'
import React from 'react';
import './App.css';
import axios from 'axios'
import { Detail, Form, Home, LandingPage } from './componets/viewns'
import { NavBar } from './componets'
axios.defaults.baseURL = 'http://localhost:3001/'


//Componets

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route exact path='/' element={<LandingPage />} />
          <Route path='/home' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/create' element={<Form />} />
      </Routes>
    </>
  );
}

export default App;
