
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import food from './food_17.png'



import React, { useContext } from 'react';
import { StoreContext } from "../../context/StoreContext"; // Adjust the path based on your project structure

import {useState,useEffect}from 'react';
import validation from './Loginvalidation'; 




const Login =() =>
{
    const {user, setUser,cartItems } = useContext(StoreContext);
    const[error,seterror]=useState({})
    const {token,setToken}=useContext(StoreContext)
const [values,setvalues]=useState ({
    email:'',
    password:''
})
const navigate=useNavigate();
const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validation(values);
    seterror(errors);

    if (errors.email === "" && errors.password === "") {
        fetch('http://localhost:4007/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
        })
        .then(response => {
            if (!response.ok) {
                if(response.status===404)
                {
                throw new Error('User not found');
                }
                else if(response.status===401)
                {
                    throw new Error('Incorrect password')
                }
                else{
                    throw new Error ('Network response was not ok')
                }
            }
            return response.json();
        
        })
        .then(response=>{
            if (response.success) {
                
                //setToken('login successfully')
                localStorage.setItem("token",response.tok);
                setToken(response.tok);
        
                console.log(response);
                console.log(token)
                console.log(response.useremail)
                console.log(response.userpassword)
                console.log(response.userId)
                if(response.useremail==='admin@gmail.com' && response.userpassword==='$2b$10$gubMCZFZ4gvFE/9jNMlzbe1IFeCMeSXsM.5FVM/rW8yQ.y4SWqzyq')
                    {
                        console.log('adminsgserhertherthertjhrtyjyujrtyjyu')
                        //navigate('/admin')
                    }
                 setUser(response.userId);

                 console.log(user)
                
          
             
                 console.log('user:',user);
                
                // localStorage.setItem("token",response.data.token)
                navigate('/');
               // setShowLogin(false);
               
              
            } else {
                toast.error("No record");
                //setToken('');
            }
        })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);

            if(error.message==='User not found')
            {
                toast.error('User not found.Please check your email and ty again');
            }
            if(error.message==='Incorrect password')
            {
                toast.error('Incorrect password.Please check your email and password and ty again');
            }

        
        });
    }
}






    




  



// const handleSubmit = (event) => {
//     event.preventDefault();
//     seterror(validation(values));

//     if (error.email === "" && error.password === "") {
//         // Show loading indicator
        

//         fetch('http://localhost:2000/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(values),
//         })
//         .then(response => {
//             if (response.ok) {
//                 return response.json();
//                 navigate('/signup');
//             } else {
//                 throw new Error('Login failed'); // Throw an error for failed login
//             }
//         })
       
//         .catch(error => {
//             // Hide loading indicator
            

//             console.error('There was a problem with your fetch operation:', error);

//             // Display error message to the user
//             seterror({ ...error, general: 'Login failed. Please try again.' });
//         });
//     }
// }

  const handleinput=(event)=>
  {
      setvalues(prev =>({...prev,[event.target.name]:[event.target.value]}))
  }

    return (
   <div style={{
     backgroundImage: `url(${food})`, // Use require() to import the image
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh', // Set minimum height to ensure full viewport coverage
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }}
     className='d-flex justify-content-center align-items-center bg primary vh-100 '>
   <div style={{
    background: 'transparent' , border: '2px solid brown',
  backdropFilter: 'blur(30px)', 
  boxShadow: '0 0 10px brown'
  }}className='bg-white p-3 rounded w-25'>
   <form style={{ backgroundColor: 'transparent', border: 'none' }} action="" onSubmit={handleSubmit}>
  
    <div className='mb-3'>
        <label htmlFor="email"><strong>Email</strong></label>
        <input  style={{  borderRadius: '50px' }}  type="email" placeholder='Enter Email' className='form-control rounded-50' name='email' onChange={handleinput}/>
        {error.email && <span className='text-danger'> {error.email}</span>}
    </div>
    <div className='mb-3'>
    <label htmlFor="password"><strong>Password</strong></label>
        <input   style={{  borderRadius: '50px' }}  type="password" placeholder='Enter Password'className='form-control rounded-50' name='password' onChange={handleinput}/>
        {error.password && <span className='text-danger'> {error.password}</span>}
    </div>
    <button  style={{  borderRadius: '50px' }}  type="submit" className='btn btn-success w-100 rounded-50'><strong>Log in</strong></button>
    <strong><p>New user ?</p></strong>
    <Link to='/signup' style={{ borderRadius: '50px' }} className='btn btn-default border w-100 bg-light rounded-50'>Create a new account</Link>
   </form>
   </div>
   </div>
     
    )
}

export default Login