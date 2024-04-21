import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home'; // Varsayılan bir ana sayfa bileşeni

function App() {
  return (
   <Routes>
      <Route path='/' element={<Home/>} />
   </Routes>
  );
}

export default App;
