
import React, { createContext, useEffect, useState } from "react";
import { hotel_list } from "../assets/assets";



export const StoreContext = createContext(null);
const url="http://localhost:4003/"

const StoreContextProvider = (props) => {
    const [user,setUser]=useState(null)
    const [cartItems, setCartItems] = useState({});
    const [success, setSuccess] = useState(false);
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
                  setfoodlist(data.data); 
                  
                })
                .catch(error => {
                  toast.error(error.message);
                });
            }, [])
        

        

            useEffect(() => {
                fetch('http://localhost:4003/listhotel', {
                method: 'GET',
              
              })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Failed to fetch hotel data');
                        }
                        return response.json();
                    })
                    .then(data => {
                        if (data.success) {
                            sethotel_list(data.data);
                        } else {
                            throw new Error(data.error);
                        }
                    })
                    .catch(error => {
                        console.error('Error fetching hotel data:', error);
                    });
            }, []);


            useEffect(()=>
            {
               
                fetch('http://localhost:4007/checkauth', {
                    headers: {
                        'access-token': localStorage.getItem("token")
                    }
                })
                .then(response => {
                    if (response.ok) {
                        return response.json(); // Parse the response as JSON
                    } else {
                        throw new Error('Network response was not ok');
                    }
                })
                .then(data => {
                    setToken(data.userId);
                    console.log('Response data:', data);
                })
                .catch(err => {
                    console.error('Fetch error:', err);
                });








            },[])


   


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
    
    const data = hotel_list

    
    const [filterData, setFilterData] = useState([]);
    const [wordEntered, setwordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setwordEntered(searchWord);

        const newFilter = data.filter((value) => {
            return value.hotel_name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilterData([]);
        }
        else {
            setFilterData(newFilter);
        }
    };

    
    const clearInput = () => {
        setFilterData([]);
        setwordEntered("");
    }

    const handleValue = (arg) => {
        // let restaurant = document.getElementById("rest");
        let ans = arg;
        console.log(ans+"\t");
        // console.log(arg);
        setwordEntered(ans);
        if (ans !== "") {
            setFilterData([]);
        }
    }

    const [hotel,sethotel] = useState(0);

    const contextValue = {
        user,
        success,
        setSuccess,
        setUser,
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        token,
        setToken,url,
    

        handleFilter,
        clearInput,
        handleValue,
        filterData,
        setFilterData,
        wordEntered,
        setwordEntered,

        hotel,
        sethotel
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;


