import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.scss';
const Navbar = () => {
  return (
    <nav>
      <ul className='mainNav'>
        <li className='title'>
          <Link to='/books'>Book Club</Link>
        </li>
        <div className='authHeader'>
          <li>
            <Link to='/register'>register</Link>
          </li>
          <li>
            <Link to='/login'>login</Link>
          </li>
          <li>
            <a href='/api/auth/logout'>logout</a>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
