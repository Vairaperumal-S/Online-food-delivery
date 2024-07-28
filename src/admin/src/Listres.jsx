
import React, { useState, useEffect } from 'react';
import './Listres.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Listres = ({url}) => {
  const [list,setList] = useState([]);
    const [data,setdata]=useState([])

  useEffect(() => {
    fetch('http://localhost:5001/listres', {
      method: 'GET',
    
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
      
        setList(data.data); 
        
      })
      .catch(error => {
        toast.error(error.message);
      });
  }, []); 

  



  useEffect(() => {
    list.forEach(item => {
      fetch(`http://localhost:5001/selectres/${item.Restaurant_id}`, {
        method: 'GET'
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch image');
        }
      })
      .then(data => {
        
        console.log('Fetched data:', data);
      })
      .catch(error => {
        console.error('Error fetching image:', error);
      });
    });
  }, [list]);
  


    
        
  







    
  

 const removefood=async(resid)=>
 {
   console.log(resid);
     fetch(`http://localhost:5001/remove/${resid}`,
    {
        method: 'DELETE'
      
        
    })
     .then (response=>
    
     {
        if(response.ok)
        {
            toast.success('Restaurant removed')
        }
        else{
            toast.error('Error');
        }

     })
     .catch(error => {
        toast.error(error.message);}
     )
          
     
    
    
 }










 
 
  return (
    <div className='list-add flex-col'>
    <p>All Resataurants</p>
    <div className='list-table'>
    <div className='list-table-format title'>
      
      <b>Image</b>
      <b>Name</b>
      <b>Address</b>
      <b>Phone_no</b>
      <b>Action</b>
    </div>
    
  
    {list.map((item,index) => {
       return (
        <div className='list-table-format' key={index}>
    
        <img className='table-image' src={'http://localhost:5001/'+item.Res_img} alt='image loading' />
        

          <p>{item.Restaurant_name}</p> 
         
          <p>{item.Restaurant_address}</p> 
          <p>{item.Phone_num}</p> 
          <p onClick={()=>removefood(item.Restaurant_id)} className='cursor'>X</p>
           
          </div>
          
       )
     
    })}
    </div>
    </div>
     )
  

  
}  



export default Listres;



