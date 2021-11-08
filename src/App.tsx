import React from 'react';
import { HashRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import Router from './components/Router';

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Router />
    </HashRouter>
  );
}

export default App;
