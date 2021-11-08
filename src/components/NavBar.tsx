import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <div className="navbar__links">
      <Link to="/">Converter</Link>
      <Link to="/table">Currencies</Link>
    </div>
  )
}

export default NavBar;
