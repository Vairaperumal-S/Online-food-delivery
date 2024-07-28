import React from 'react'
import "./Review.css";
import { toast, ToastContainer } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css'; 
import {useState} from 'react'
const Review = () => {



  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((prevdata) => ({
      ...prevdata,
      [name]: value
    }));
  };

  const [data,setdata]=useState({
     user_name:'',
     restaurant_name:'',
     rating:'',
     comment:'',
    });


    const handlesubmit = async (event) => {
      event.preventDefault();

      const reviewData = {
        User_name: data.user_name,
        Restaurant_name: data.restaurant_name,
        rating: data.rating,
        comment: data.comment,
      };
      // const formData=new FormData();
      // formData.append('User_name',data.user_name);
      // formData.append('Restaurant_name',data.restaurant_name);
      // formData.append('rating',data.rating);
      // formData.append('comment',data.comment);
      

      try{
        const response = await fetch('http://localhost:8006/addreview', {
        method:'POST',
       headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),

      })
      if(!response.ok)
        {
          throw new Error ('Failed to add Review')
        }
        const responsedata=await response.json();
        if(responsedata.success)
          {
            setdata({user_name:'',
            restaurant_name:'',
            rating:'',
            comment:''});

            toast.success('Review added successfully')
          }
          else{
            throw new Error('Review not added:'+responsedata.message)
          }
        }
        catch(error)
        {
          toast.error(error.message);
          console.error('Error',error)
        }
    }
  return (
          <div className='review'>
            <ToastContainer />
          <p>Enter your Review</p>
            <form className='form' onSubmit={handlesubmit}>
              <div className='input-box'>
              <label> User Name</label>
              <input type='text'  onChange={onchangehandler} value={data.user_name} name='user_name' placeholder='User Name' required/>
              </div>

              <div className='input-box'>
              <label> Restaurant Name</label>
              <input type='text'  onChange={onchangehandler} name='restaurant_name' value={data.restaurant_name} placeholder='Restaurant_name' required/>
              </div>


              <div className='input-box'>
              <label> Rating</label>
              <input type='number' onChange={onchangehandler}  name='rating' value={data.rating} placeholder='Rating' required/>
              </div>

              <div className='input-box'>
              <label>Comments</label>
             <textarea value={data.comment}  onChange={onchangehandler} name='comment' placeholder='Comments' required/>
              </div>

              <button   style={{ maxWidth: '100px' }} type='submit'   className="btn btn-primary"> Submit review</button>


             


              

            </form>
          </div>
  )
}

export default Review