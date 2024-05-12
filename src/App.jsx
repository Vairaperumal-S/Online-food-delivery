import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import './App.css';


import { LoginPopup, Signup, Login } from './components/LoginPopUp/LoginPopup';

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Footer from './components/Footer/Footer'






const App = () => {

const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App







  
//   return (
//     <div className='app'>
//     <Router>
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         {/* <Route path="/" element={<Login />} /> */}
//         <Route path='/' element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path='/cart' element={<Cart />} />
//                   <Route path='/order' element={<PlaceOrder />} />
//       </Routes>
//     </Router>
//      </div>
//      <Footer/>
    
  
//   );
// }







// import React from 'react';
// import Navbar from './components/Navbar/Navbar';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
// import './App.css';
// // import Signup from './Signup.jsx';
// // import Login from './Login.jsx';
// import Home from './pages/Home/Home';
// import Cart from './pages/Cart/Cart';
// import Footer from './components/Footer/Footer';

// const App = () => {
//     return (
//         <div className='app'>
//             <Router>
//                 <Navbar />
//                 <Routes>
//                     <Route path="/signup" element={<Signup />} />
//                     {/* <Route path="/" element={<Login />} /> */}
//                     <Route path='/' element={<Home />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path='/cart' element={<Cart />} />
//                     <Route path='/order' element={<PlaceOrder />} />
//                 </Routes>
//             </Router>
//             <Footer />
//         </div>
//     );
// }

// export default App;







