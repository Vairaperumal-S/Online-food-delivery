// // import React, { useState } from 'react'
// // import './LoginPopup.css'
// // import { assets } from '../../assets/assets'

// // const LoginPopup = ({setShowLogin}) => {

// //     const [currState,setCurrState] = useState("Login")

// //   return (
// //     <div className='login-popup'>
// //       <form className="login-popup-container">
// //         <div className="login-popup-title">
// //             <h2>{currState}</h2>
// //             <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
// //         </div>
// //         <div className="login-popup-inputs">
// //             {currState==="Login"?<></> : <input type="text" placeholder='Your name' required />}
// //             <input type="email" placeholder='Your email' required />
// //             <input type="password" placeholder='Password' required />
// //         </div>
// //         <button>{currState==="Sign Up"?"Create account":"Login"}</button>
// //         <div className="login-popup-condition">
// //             <input type="checkbox" required />
// //             <p>By continuing, i agree to the terms of use & privacy policy.</p>
// //         </div>
// //         {currState==="Login"
// //         ?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>
// //         :<p>Already have an accoun? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
// //         }
        
        
// //       </form>
// //     </div>
// //   )
// // }

// // export default LoginPopup



// // LoginPopup.jsx

// // import React, { useState } from 'react';
// // import './LoginPopup.css';
// // import { assets } from '../../assets/assets';
// // import Login from '../Login'; // Import Login component from Login.js
// // import Signup from '../Signup'; // Import Signup component from Signup.js

// // const LoginPopup = ({ setShowLogin }) => {
// //     const [currState, setCurrState] = useState("Login");

  
// //     return (
// //         <div className='login-popup'>
// //             {/* JSX for LoginPopup component */}
// //             {currState === "Login" ? <Login /> : <Signup />}
// //         </div>
// //     );
// // };

// // export default LoginPopup;


// import React, { useState } from 'react';
// import './LoginPopup.css';
// import { assets } from '../../assets/assets';
// import Login from './Login'; // Update the import path for Login component
// import Signup from './Signup'; // Update the import path for Signup component

// const LoginPopup = ({ setShowLogin }) => {
//     const [currState, setCurrState] = useState("Login");

//     // This is where you write the code for the LoginPopup component
//     return (
//         <div className='login-popup'>
//             {/* JSX for LoginPopup component */}
//             {currState === "Login" ? <Login /> : <Signup />}
//         </div>
//     );
// };

// export default LoginPopup;




// In LoginPopup.jsx

import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import { StoreContext } from '../../context/StoreContext.jsx';

const LoginPopup = ({ setShowLogin }) => {
 
    const [currState, setCurrState] = useState("Login");
     setShowLogin(false);

    return (
        <div className='login-popup'>
            {/* JSX for LoginPopup component */}
     
            {currState === "Login" ? <Login /> : <Signup />}
        </div>
    );
};

export { LoginPopup, Signup, Login };


