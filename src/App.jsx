import React, { useState } from 'react'
//import Orders from './admin/src/App'
import Navbar from './components/Navbar/Navbar'
//import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';



import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import './App.css';


import { LoginPopup, Signup, Login } from './components/LoginPopUp/LoginPopup';

import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Payment from './pages/Myorders/Payment';
import Footer from './components/Footer/Footer'
import Myorders from './pages/Myorders/Myorders'
import Review from './components/Review/Review';
import New from './components/LoginPopUp/New';





const App = () => {

const [showLogin,setShowLogin] = useState(false)

  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin} />:<></>}
  
      <div className='app'>
      
        <Navbar setShowLogin={setShowLogin}/>
        <ToastContainer />
     
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/login" element={<Login />} />
          <Route path='/myorders' element={<Myorders/>} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/review" element={<Review />} />
          <Route path='/New' element={<New/>}/>
          {/* <Route path='/admin' element={<AdminDetails/>}/> */}
          {/* <Route path='/admin' element={<Orders/>}/> */}
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







