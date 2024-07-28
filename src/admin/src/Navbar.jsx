import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from './Logo.png';
import profile from './profile_image.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleShowOrderClick = () => {
    navigate('/showmax');
  };

  return (
    <>
    <div className='navbar'>
      <img className='logo' src={logo} alt="Logo" />
      <img className='profile' src={profile} alt='Profile' />
      </div>
      <button className='show_order' onClick={handleShowOrderClick}>Max orders</button>
      <button className='logout_button'>Logout</button>
      </>

  );
}

export default Navbar;
