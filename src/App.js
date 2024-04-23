import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Varsayılan bir ana sayfa bileşeni
import CityDetail from './pages/CityDetail';
import Header from './components/Header';

function App() {
  return (
   <>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/:cityName' element={<CityDetail/>} />
   </Routes>
   </>
   
  );
}

export default App;
