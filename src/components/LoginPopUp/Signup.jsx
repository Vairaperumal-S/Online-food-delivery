
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link} from 'react-router-dom';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from "react-icons/fa";

import validation from './Signupvalidation'; 
import foodImage from './food_10.png';
import img from './food_11.png'






const Signup =() =>
{
    const [signuperror,setsignuperror]=useState('');
    const[error,seterror]=useState({})
const [values,setvalues]=useState ({
    name:'',
    email:'',
    password:'',
    // confirmpassword:'',
    phone:''
})
const navigate=useNavigate();

const handleSubmit = (event) => {
    event.preventDefault();
    seterror(validation(values));



//     if (error.name === "" && error.email === "" && error.password === "" && error.phone === "") {
//         axios.post('http://localhost:8081/signup', values)
//         .then(res => {
//           navigate('/');
//         }

//         )
//         .catch(err => console.error(err));
          
        
      
//     }
// };


if (error.name === "" && error.email === "" && error.password === "" && error.phone === "") {
    fetch('http://localhost:4007/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    })
    .then(response => {
        if(!response.ok)
        {
            if(response.status===401)
            {
                throw new Error ("User already exists");
            }
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
          //console.log(data.message);
      
          navigate('/login');
        } else {
          throw new Error('Signup failed: ' + data.message);
        }
      }).catch(error => {
        
        if(error.message==='User already exists')
            {
                //setsignuperror("User already exists .Please go to login page");
                alert('User already exists .Please go to login page')
            }
    });
}
};


















// Run this effect whenever 'error' state changes

  const handleinput=(event)=>
  {
      setvalues(prev =>({...prev,[event.target.name]:[event.target.value]}))
      console.log(values);
  }

    return (
   <div   style={{
   backgroundImage: `url(${img})`, // Use require() to import the image
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh', // Set minimum height to ensure full viewport coverage
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}className='d-flex justify-content-center align-items-center bg primary vh-100'>

   <div style={{ background: 'transparent' , border: '2px solid brown',
  backdropFilter: 'blur(30px)', 
  boxShadow: '0 0 10px brown' }}className=' p-3 rounded w-25'>
   <form  action=""   onSubmit={handleSubmit}>
   <div className='mb-3'>
        <label style={{Color:'blue'}} htmlFor="name"><strong>Name</strong></label>
        <input   
      style={{ borderRadius: '50px'}}
    
    type="name"   placeholder='Enter name' className='form-control rounded-50' name='name' onChange={handleinput}/>
        
        {error.name && <span className='text-danger'> {error.name}</span>}
    </div>









    <div className='mb-3'style={{ marginBottom: '20px' }}>
        <label htmlFor="email"><strong>Email</strong></label>
        <input  style={{  borderRadius: '50px' }}   type="email" placeholder='Enter Email' className='form-control rounded-50' name='email' onChange={handleinput}/>
        {error.email && <span className='text-danger'> {error.email}</span>}
    </div>
    <div className='mb-3'>
    <label htmlFor="password"><strong>Password</strong></label>
        <input  style={{  borderRadius: '50px' }}  type="password"    placeholder='Enter Password'className='form-control rounded-50' name='password' onChange={handleinput}/>
        {error.password && <span className='text-danger'> {error.password}</span>}
    </div>


    {/* <div className='mb-3'>
    <label htmlFor="confirmpassword"><strong>ConfirmPassword</strong></label>
        <input type="password" placeholder='Confirm Password'className='form-control rounded-0' name='confirmpassword' onChange={handleinput}/>
        {error.confirmpassword && <span className='text-danger'> {error.confirmpassword}</span>}
    </div> */}

 
    <div className='mb-3'>
        <label htmlFor="phone"><strong>Phone Number</strong></label>
        <input   style={{  borderRadius: '50px' }}  type="number"   placeholder='Enter phone' className='form-control rounded-50' name='phone' onChange={handleinput}/>
        {error.phone && <span className='text-danger'> {error.phone}</span>}
    </div>



    <button  style={{  borderRadius: '50px' }} type="submit" className='btn btn-success w-100 rounded-50'><strong>Sign Up</strong></button>
     {/* <p>You are agree to our terms and polices</p>  */}
     
    {signuperror &&
     <p>{signuperror}</p>}
     <br></br>
     
     <strong>Already a user ?</strong>
      <Link style={{  borderRadius: '50px' }} to='/login'  className='btn btn-default border w-100 bg-light rounded-50'>Log in</Link>
   </form>
   </div>
   </div>
     
    )
    
}

export default Signup