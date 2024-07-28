import React, { useContext, useEffect } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import Ratingcomponent from '../Rating/Rating';
 

import Aos from 'aos'
import 'aos/dist/aos.css'
  



const FoodItem = ({id,name,price,description,image,Restaurant_name,Rating}) => {
    
  useEffect(()=>{
    Aos.init({offset: 60, once: true,  disable: 'phone', duration: 300,
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 0,
    throttleDelay: 0,
    });
  },[]) 
   
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'  data-aos = "fade-left">
      <div className="food-item-img-container">
        <img className='food-item-image' src={url+image} alt="" />
        {!cartItems[id]
            ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt="" />
            :<div className='food-item-counter'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
            <p>{name}</p>
            <Ratingcomponent rating={Rating}/>
        </div>  
      <p style={{ color: 'black' }} className="food-item-resname">{Restaurant_name}</p>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">&#x20B9;{price}</p>
      </div>
    </div>
  )
}

export default FoodItem
