
import React, { useState, useEffect } from 'react';
import './List.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List = ({url}) => {
  const [list,setList] = useState([]);
    const [data,setdata]=useState([])

  useEffect(() => {
    fetch('http://localhost:4003/list', {
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
      fetch(`http://localhost:4003/select/${item._id}`, {
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
  


    
        
  







    
  
  const removefood = async (foodid) => {
    console.log(foodid);
    try {
        const response = await fetch(`http://localhost:4003/remove/${foodid}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            toast.success('Food removed successfully');
        } else {
            const errorResponse = await response.json();
            toast.error(`Error: ${errorResponse.error || 'Failed to remove food'}`);
        }
    } catch (error) {
        toast.error(`Network error: ${error.message}`);
    }
}

          
     
    
    
 










 
 
  return (
    <div className='list-add flex-col'>
    <p>All foods</p>
    <div className='list-table'>
    <div className='list-table-format title'>
      
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b>Action</b>
    </div>
    
  
    {list.map((item,index) => {
       return (
        <div className='list-table-format' key={index}>
    
        <img className='table-image' src={'http://localhost:4003/'+item.image} alt='image loading' />
        

          <p>{item.name}</p> 
         
          <p>{item.category}</p> 
          <p>${item.price}</p> 
          <p onClick={()=>removefood(item._id)} className='cursor'>X</p>
           
          </div>
          
       )
     
    })}
    </div>
    </div>
     )
  

  
}  

export default List;



