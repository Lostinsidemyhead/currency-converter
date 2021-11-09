import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <div className="navbar">
      <Link className='navbar__link' to="/">Converter</Link>
      <Link className='navbar__link' to="/table">Currencies</Link>
    </div>
  )
}

export default NavBar;
