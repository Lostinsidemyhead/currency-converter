import React from 'react';
import { Route, Routes } from "react-router-dom";
import Converter from './Converter';
import Currencies from './Currencies';

const Router: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Converter />} />
      <Route path="/table" element={<Currencies />} />
    </Routes>
  )
}

export default Router;
