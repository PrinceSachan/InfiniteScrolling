import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './components/Main';
import Rawjson from './components/Rawjson';

const App: React.FC = () => {
  
  
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/jsondetails' element={<Rawjson />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
