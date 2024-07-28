
import React from 'react';
import {Link} from 'react-router-dom'

import './Sidebar.css';
import add from './plus.png';
import order from './order.png';


  const handleClick = (event) => {
    //event.preventDefault(); 
   
  };
const Sidebar = () => {

  return (
    <div className='sidebar'>
      <div className='sidebar-options'>
     
        <Link to='/add' className='sidebar-option' onClick={handleClick}>
          <img className='add' src={add} alt='add is loading'/>
          <p>Add items</p>
        </Link>

        <Link to='/addres' className='sidebar-option' onClick={handleClick}>
          <img className='add' src={add} alt='add is loading'/>
          <p>Add Restaurant</p>
        </Link>
        <Link to='/list' className='sidebar-option' onClick={handleClick}>
          <img className='order' src={order} alt='list is loading'/>
          <p>List items</p>
        </Link>


        <Link to='/listres' className='sidebar-option' onClick={handleClick}>
          <img className='order' src={order} alt='list is loading'/>
          <p>List Resataurants</p>
        </Link>
        <Link to='/orders' className='sidebar-option' onClick={handleClick}>
          <img className='order' src={order} alt='order is loading'/>
          <p>Orders</p>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
















// import React from 'react';
// import { Link } from 'react-router-dom'; 

// import './Sidebar.css';
// import add from './plus.png';
// import order from './order.png';

// const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//       <div className='sidebar-options'>
        
//         <Link to='/add' className='sidebar-option'>
//           <img className='add' src={add} alt='add is loading'/>
//           <p>Add items</p>
//         </Link>
//         <Link to='/list' className='sidebar-option'>
//           <img className='order' src={order} alt='list is loading'/>
//           <p>List items</p>
//         </Link>
//         <Link to='/orders' className='sidebar-option'>
//           <img className='order' src={order} alt='order is loading'/>
//           <p>Orders</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
