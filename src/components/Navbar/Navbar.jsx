import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';

import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import SearchBar from '../SearchBar/SearchBar';

import { hotel_list } from '../../assets/assets';

const Navbar = () => {
  const {token,setToken}=useContext(StoreContext)
  console.log("tokennavbar:",token);
    const [menu,setmenu] = useState("home");

    const {getTotalCartAmount} = useContext(StoreContext)
       const logout=()=>
        {
            setToken('');
            Navigate('/');
        }
        
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={()=>setmenu("home")} className={menu==="home"?"active":""}>home</Link>
        <a href='#explore-menu' onClick={()=>setmenu("menu")} className={menu==="menu"?"active":""}>menu</a>
        <a href='#app-download' onClick={()=>setmenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>
        <a href='#footer' onClick={()=>setmenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
        <Link to='/review' onClick={()=>setmenu("review")} className={menu==="review"?"active":""}>Review</Link>
      </ul>
      <div className="navbar-right">
        {/* <img src={assets.search_icon} alt="" /> */}
        <SearchBar placeholder="Enter a Restauarnt name..." data={hotel_list} />

        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {/* {setToken?
       <Link to='/login'><button onClick={()=>setShowLogin(true)}>sign in</button> </Link> 
       :<div className='navbar-profile'>
        <img src={assets.profile_icon} alt='loading'/>
          
          </div>
        } */}
        
  {!token ? (
    <Link to='/login'>
      <button onClick={() => setShowLogin(true)}>Sign In</button>
    </Link>
  ) : (
    <div className='navbar-profile'>
    <img src={assets.profile_icon} alt='loading' />
    <ul className='navbar-profile-dropdown'>
    <li>
      <Link to='/myorders' ><img src={assets.bag_icon} alt='loading bag_icon'/><p>Orders</p></Link>
    </li>
    <hr/>
    <li><img src={assets.logout_icon} alt='logout_icon is loading'/><p onClick={logout} >logout</p></li>

    </ul>
    </div>
  )}


      </div>
    </div>
  )
}

export default Navbar
