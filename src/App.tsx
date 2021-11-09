import React from 'react';
import { HashRouter } from "react-router-dom";
import NavBar from './components/NavBar';
import Router from './components/Router';

function App() {
  return (
    <HashRouter>
      <div>
        <NavBar />
        <Router />
      </div>

    </HashRouter>
  );
}

export default App;
