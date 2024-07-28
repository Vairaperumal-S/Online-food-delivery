import React from 'react'
import upload from './upload_area.png'
import { toast, ToastContainer } from 'react-toastify';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Addres.css'
const Addres = ({}) => {
  const [image,setimage]=useState(false);
  const [data,setdata]=useState({
      Restaurant_id:'',
       Restaurant_name:'',
       Restaurant_address:'',
       Restaurant_phone:''
     
      
      });
  

      const navigate=useNavigate();


      const handlesubmit = async (event) => {
        event.preventDefault();
      
        // Construct FormData object
        const formData = new FormData();
        formData.append('Restaurant_id', data.Restaurant_id);
        
        formData.append('Restaurant_name', data.Restaurant_name);
        
        formData.append('Restaurant_address', data.Restaurant_address);
    
     
        formData.append('phone_num', data.Restaurant_phone);
        formData.append('Res_img', image); 
    
       
      
        try {
         
          const response = await fetch('http://localhost:5001/add', {
            method: 'POST',
            body: formData 
          });
      
         
          if (!response.ok) {
            throw new Error('Failed to add Restaurant');
          }
      
          const responseData = await response.json();
          if (responseData.success) {
          
            setimage(false);
            setdata({
                Restaurant_id:'',
                Restaurant_name:'',
                Restaurant_address:'',
                Restaurant_phone:''
             
            });
            
            toast.success('Restaurant added successfully');
          } else {
            throw new Error('Restaurant not added: ' + responseData.message);
          }
        } catch (error) {
          toast.error(error.message);
          console.error('Error:', error);
          
        }
      };
      













  
  const onchangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((prevdata) => ({
      ...prevdata,
      [name]: value
    }));
  };
  


  console.log(data);
  return (
    <div className='add-resdetails'>
    <form className='flex-col'   onSubmit={handlesubmit}>

       <div className='add-image-upload flex-col'>
        <p>Upload image</p>
          <label htmlFor='image'>
  

          <img src={image?URL.createObjectURL(image):upload} alt='upload image'/>
         </label>
         

        <input onChange={(e)=>
          {
              setimage(e.target.files[0])
          }}
        type="file"  id='image' hidden required/>
       </div> 

       <div className='add-restaurant flex-col'>
       <p>Restaurant Id</p>
       <input type='Number'    onChange={onchangehandler}  value={data.Restaurant_id} name='Restaurant_id' placeholder="Restaurant's id"  required/>
       </div>

      

      <div className='add-restaurant-name flex-col'>
        <p>Restaurant name</p>
        <input onChange={onchangehandler}  value={data.Restaurant_name} name='Restaurant_name' type='text'  placeholder='Restaurant name' required/>
      </div>
      <div className='add-restaurant-address flex-col'>
      <p>Restaurant address</p>
        <textarea    onChange={onchangehandler}  value={data.Restaurant_address} name='Restaurant_address'   rows='6' placeholder='Restaurant address' required></textarea>
      </div>



      <div className='add-phone-num flex-col'>
        <p>Restaurant Phone number</p>
        <input onChange={onchangehandler}  value={data.Restaurant_phone} name='Restaurant_phone' type='number'  placeholder='Restaurant phone number' required/>
      </div>
      
     


      <button  style={{ maxWidth: '120px' }}type="submit"   className="btn btn-primary">ADD Restaurant</button>

       
     </form>
    </div>
  )
}

export default Addres