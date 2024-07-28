import React from 'react'
import upload from './upload_area.png'
import { toast, ToastContainer } from 'react-toastify';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import './Add.css'
const Add = ({}) => {
  const [image,setimage]=useState(false);
  const [data,setdata]=useState({
      id:'',
       Restaurent:'',
       name:'',
       description:'',
       price:'',
       category:'Salad',
      
      });
  

      const navigate=useNavigate();


      const handlesubmit = async (event) => {
        event.preventDefault();
      
        // Construct FormData object
        const formData = new FormData();
        formData.append('_id', data.id);
        
        formData.append('Restaurent_id', data.Restaurent);
        formData.append('name', data.name);
        formData.append('description', data.description);
    
     
        formData.append('price', data.price);
        formData.append('image', image); 
        formData.append('category', data.category); 
       
      
        try {
          const response = await fetch('http://localhost:4003/add', {
            method: 'POST',
            body: formData 
          });
        
          if (!response.ok) {
            const errorResponse = await response.json();
            if (response.status === 400) {
              throw new Error(errorResponse.error);
            }
          } else {
            const responseData = await response.json();
            if (responseData.success) {
              setimage(false);
              setdata({
                id: '',
                Restaurent: '',
                name: '',
                description: '',
                price: '',
                category: 'Salad'
              });
              toast.success('Food added successfully');
            } else {
              throw new Error('Food not added: ' + responseData.message);
            }
          }
        } catch (error) {
          if (error.response && error.response.data && error.response.data.sqlMessage) {
            toast.error('Database error: ' + error.response.data.sqlMessage);
          } else {
            toast.error(error.message);
          }
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
    <div className='add-details'>
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

       <div className='add-restaurent flex-col'>
       <p>Restaurent Id</p>
       <input type='Number'    onChange={onchangehandler}  value={data.Restaurent} name='Restaurent' placeholder="Restaurent's id"  required/>
       </div>

       <div className='add-food_id flex-col'>
       <p>Food_id</p>
       <input type='Number'    onChange={onchangehandler}  value={data.id} name='id' placeholder="Food_id"  required/>
       </div>

      <div className='add-product-name flex-col'>
        <p>Product name</p>
        <input onChange={onchangehandler}  value={data.name} name='name' type='text'  placeholder='Type here' required/>
      </div>
      <div className='add-product-description flex-col'>
      <p>Product description</p>
        <textarea    onChange={onchangehandler}  value={data.description} name='description'   rows='6' placeholder='Write content here' required></textarea>
      </div>
      <div className='add-price-category'>
      <div className='add-product-category flex-col'>
        <p>Product category</p>
        <select onChange={onchangehandler}  value={data.category} name='category'>
        <option value='Salad'>Salad</option>
        <option value='Rolls'>Rolls</option>
        <option value='Deserts'>Deserts</option>
        <option value='Sandwich'>Sandwich</option>
        <option value='Cake'>Cake</option>
        <option value='Pure veg'>Pure veg</option>
        <option value='Pasta'>Pasta</option>
        <option value='Noddles'>Noodles</option>
        </select>
      </div> 
      <div className='add-product-price flex-col'>
      <p>Product Price</p>
      <input type='Number' onChange={onchangehandler}  value={data.price} name='price' placeholder='$20' />

      </div>

      </div>


      <button  style={{ maxWidth: '120px' }}type="submit"   className="btn btn-primary">ADD</button>

       
     </form>
    </div>
  )
}

export default Add