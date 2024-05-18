
import React, { createContext, useEffect, useState } from "react";



export const StoreContext = createContext(null);
const url="http://localhost:4002/"

const StoreContextProvider = (props) => {
    const [user,setUser]=useState(null)
    const [cartItems, setCartItems] = useState({});
    const [food_list,setfoodlist]=useState([])
    const [token,setToken]=useState('');
    const addToCart = (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }
    }

    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
    }

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])

     useEffect (()=>
    

        {
            fetch('http://localhost:4002/list', {
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
                  setfoodlist(data.data); 
                  
                })
                .catch(error => {
                  toast.error(error.message);
                });
            }, [])
        




   


    const getTotalCartAmount = () => {
        let totalAmount = 0;
        
        console.log('cartitems',cartItems)
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                console.log(food_list)
                let itemInfo = food_list.find((product) => product._id == item);
                console.log('item',item);
                console.log("Item info:",itemInfo)
                if (itemInfo && itemInfo.price) { 
                    totalAmount += itemInfo.price * cartItems[item];
                } else {
                    console.error(`Item with ID ${item} does not have a valid price.`);
                }
            }
        }
        return totalAmount;
    }
    

    const contextValue = {
        user,
        setUser,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,url
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;


