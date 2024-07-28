// import React, { useContext,useEffect,useState } from 'react'
// import './PlaceOrder.css'
// import { useNavigate } from 'react-router-dom'
// import { StoreContext } from '../../context/StoreContext'
// //import { useHistory } from 'react-router-dom';
// import { loadStripe } from '@stripe/stripe-js'

// const url="http://localhost:4003/"

// const PlaceOrder = () => {
//     const [data,setdata]=useState({
//         firstname:'',
//         lastname:'',
//         email:'',
//         Street:'',
//         City:'',
//         State:'',
//         phone:''
//      })
//     const {user, setUser,token } = useContext(StoreContext);
//     const {success,setSuccess } = useContext(StoreContext);
//     const {cartItems,food_list,getTotalCartAmount,setCartItems} = useContext(StoreContext);
//    //const history = useHistory();
//    const navigate=useNavigate();



//     const orderinsert = async (event) => {
//         event.preventDefault();
      
//         const items = food_list.map(item => {
//           if (cartItems[item._id] > 0) {
//             return {
//               item_id: item._id,
//               images:url+item.image,
//               quantity: cartItems[item._id],
//               subtotal_price:item.price, 
//               price: item.price * cartItems[item._id],
//             };
//           }
//           return null;
//         }).filter(item => item !== null);
      

//         console.log('Items:', items);
//         if (items.length === 0) {
//           console.error('No items in the cart');
//           return;
//         }
      
//         try {
          
//           const restaurantResponses = await Promise.all(items.map(item =>
//             fetch(`http://localhost:8006/getrest/${item.item_id}`, {
//               method: 'GET',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//             })
//           ));
      
          
//           const failedResponses = restaurantResponses.filter(response => !response.ok);
//           if (failedResponses.length > 0) {
//             throw new Error('One or more network responses were not ok');
//           }
      
//           const restaurantData = await Promise.all(restaurantResponses.map(response => response.json()));
//           const restaurantId = restaurantData[0].data[0].Restaurent_id; 
//           const currentDate = new Date();
//               currentDate.setHours(currentDate.getHours() + 5);
//               currentDate.setMinutes(currentDate.getMinutes() + 30);
//           const requestBody = {
//             user_id: user,
//             Restaurant_id: restaurantId,
//             total_price: getTotalCartAmount() + 50, 
//             order_date:currentDate.toISOString(),
//             status: 'pending',
//             items, 
//           };
      
//           const orderResponse = await fetch('http://localhost:8006/addorders', {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//             body: JSON.stringify(requestBody),
//           });
      
//           if (!orderResponse.ok) {
//             if (orderResponse.status === 500) {
//               throw new Error('Internal server error');
//             }
//           }
      
//           const orderData = await orderResponse.json();
//           if (orderData.success) {
//             console.log('order_id:', orderData.order_id);
//             console.log('Successfully added');
//             const currentDate = new Date();
//               currentDate.setHours(currentDate.getHours() + 5);
//               currentDate.setMinutes(currentDate.getMinutes() + 30);
//             const paymentData = {
//               order_id: orderData.order_id, 
//               payment_Date:currentDate.toISOString(),
//               payment_method: 'Credit card',
//               payment_status: 'Pending',
//               amount: getTotalCartAmount() + 2, // Assuming delivery fee is added to the total price
//             };
      
//             const paymentResponse = await fetch('http://localhost:8006/insertpayment', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               credentials: 'include',
//               body: JSON.stringify(paymentData),
//             });
      
//             if (!paymentResponse.ok) {
//               if (paymentResponse.status === 500) {
//                 throw new Error('Internal server error');
//               }
//             }
      
//             const paymentDataResponse = await paymentResponse.json();
//             if (paymentDataResponse.success) {
//               setCartItems([])
//                 //history.push('/payment', { state: { order_id: orderData.order_id } }); 
//                  //navigate('/payment', { state: { order_id: orderData.order_id } });
//               console.log('Payment details inserted successfully');
//             }
    
          
//             if(success)
//                 {

//                     console.log('success',success)

//                     const paymentupdateresponse = await fetch('http://localhost:8006/updatepayment', {
//                         method: 'POST',
//                         headers: {
//                           'Content-Type': 'application/json',
//                         },
//                         credentials: 'include',
//                         body: JSON.stringify({order_id:orderData.order_id}),
//                       });
                
//                       if (!paymentupdateresponse.ok) {
//                         if (paymentupdateresponse.status === 500) {
//                           throw new Error('Internal server error');
//                         }
//                       }
                
//                       const paymentresponse = await paymentupdateresponse.json();
//                       if (paymentresponse.success) 
//                         {
//                                   console.log('succesfully payment status updated')
//                         }
                    



















//             // Insert order items after order is created 
//             const orderItemsData = items.map(item => ({
//               order_id: orderData.order_id,
//               item_id: item.item_id,
//               Quantity: item.quantity, // Ensure quantity is included
//               subtotal_price: item.subtotal_price,
//             }));
      
//             const orderItemsResponse = await fetch('http://localhost:8006/order-items', {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//               },
//               credentials: 'include',
//               body: JSON.stringify({ items: orderItemsData }),
//             });
      
//             if (!orderItemsResponse.ok) {
//               if (orderItemsResponse.status === 500) {
//                 throw new Error('Internal server error');
//               }
//             }
      
//             const orderItemsResponseData = await orderItemsResponse.json();
//             if (orderItemsResponseData.success) {
//               console.log('Order items inserted successfully');
//               console.log(orderItemsResponseData.items)
//               const currentDate = new Date();
//               currentDate.setHours(currentDate.getHours() + 5);
//               currentDate.setMinutes(currentDate.getMinutes() + 30);
//               const deliverydata = {
//                 order_id: orderData.order_id,

//                 delivery_date:currentDate.toISOString(),
//                 delivery_address:[// Wrap delivery_address in an array
//                     {
//                         firstname: data.firstname,
//                         lastname: data.lastname,
//                         email: data.email,
//                         Street: data.Street,
//                         City: data.City,
//                         State: data.State,
//                         phone: data.phone
//                     }],
                
//                 delivery_status: 'Food processing'
//             };
            
//             const deliveryResponse = await fetch('http://localhost:8006/delivery', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 credentials: 'include',
//                 body: JSON.stringify({ deliverydata }),
//             });
            
//             if (!deliveryResponse.ok) {
//                 if (deliveryResponse.status === 500) {
//                     throw new Error('Internal server error');
//                 }
//             }
            
//             const deliveryResponseData = await deliveryResponse.json();
//             if (deliveryResponseData.success) {
//                 console.log('delivery inserted successfully');
//                 setTimeout(() => {
//                     navigate('/');
//                 }, 7000);
               
//             }
          
            
//           }
        
//     }
//     else{

//         console.log('payment failure');
//         const paymentupdateresponse = await fetch('http://localhost:8006/updatepaymentfailure', {
//                         method: 'POST',
//                         headers: {
//                           'Content-Type': 'application/json',
//                         },
//                         credentials: 'include',
//                         body: JSON.stringify({order_id:orderData.order_id}),
//                       });
                
//                       if (!paymentupdateresponse.ok) {
//                         if (paymentupdateresponse.status === 500) {
//                           throw new Error('Internal server error');
//                         }
//                       }
                
//                       const paymentresponse = await paymentupdateresponse.json();
//                       if (paymentresponse.success) 
//                         {
//                                   console.log('succesfully payment status updated')
//                         }
                    
//     }
// }


   
//         } catch (error) {
//           console.error('There was a problem with your fetch operation:', error);
//         }
//       };
 
// // useEffect(() => {
// //     if (!token) {
// //         navigate('/cart');
// //     } else if (getTotalCartAmount() === 0) {
// //         navigate('/cart');
// //     }
// // }, [token]);
// const placeOrder = async (event) => {
//   event.preventDefault();

  

  
//   try {
//     const stripe = await loadStripe("pk_test_51PZngHJzC2rtGIgm4naf9i94wpjFHpBBlzlc4TUVlL5GGmJsdwDnhHKKueFhVMwlFQ76j73O108NfTsh2o944xn600LjWLNRDr");
    

//     //const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     console.log(food_list)
//     console.log(food_list.images)
   
//     const items = food_list.map(item => {
//       if (cartItems[item._id] > 0) {
        
//           return {
//               name:item.name,
//               images:url+item.image,
//               item_id: item._id,
//               quantity: cartItems[item._id],
//               subtotal_price: item.price,
//               price: item.price * cartItems[item._id],
//           };

          
//       }
//       return null;
//   }).filter(item => item !== null);
//   console.log("products",items)

//   const body = {
//       products: items,
      
            
//   };

//     const headers = {
//       "Content-Type": "application/json"
//     };

//     const response = await fetch(`http://localhost:8007/create-checkout-session`, {
//       method: "POST",
//       headers: headers,
//       body: JSON.stringify(body)
//     });

//     if (!response.ok) {
//       setSuccess(false);
//       throw new Error('Network response was not ok');
     
//     }
    

//     const session = await response.json();
//    if(session)
//    {
//     setSuccess(true)
//    }
//    else{
//     setSuccess(false)
//    }
//     const result = await stripe.redirectToCheckout({
//       sessionId: session.id,
      
//     });

//     if (result.error) {
//       console.error(result.error.message);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };




    
    
//     const handleinput=(event)=>
//         {
//             setdata(prev =>({...prev,[event.target.name]:[event.target.value]}))
//             console.log('data',data);
//         }
    
    
//       return (
//         <form onSubmit={placeOrder} className='place-order'>
//           <div className="place-order-left">
//             <p className="title">Delivery Information</p>
//             <div className="multi-fields">
//                 <input type="text" name='firstname' onChange={handleinput}  placeholder='First name'/>
//                 <input type="text" name='lastname'  onChange={handleinput}  placeholder='Last name'/>
//             </div>
//             <input type="email"  name='email' onChange={handleinput} placeholder='Email address'/>
//             <input type="text"  name='Street'  onChange={handleinput} placeholder='Street'/>
//             <div className="multi-fields">
//                 <input type="text"  name='City' onChange={handleinput}  placeholder='City'/>
//                 <input type="text" name='State'  onChange={handleinput} placeholder='State'/>
//             </div>
//             {/* <div className="multi-fields">
//                 <input type="text"  name='Zip code' onChange={handleinput} placeholder='Zip code'/>
//                 <input type="text" name='Country' onChange={handleinput} placeholder='Country'/>
//             </div> */}
//              <input type="text"  name='phone' onChange={handleinput} placeholder='Phone'/>
//           </div>
//           <div className="place-order-right">
//           <div className="cart-total">
//                         <h2>Cart Total</h2>
//                         <div>
//                             <div className="cart-total-details">
//                                 <p>Subtotal</p>
//                                 <p>&#x20B9;{getTotalCartAmount()}</p>
//                             </div>
//                             <hr />
//                             <div className="cart-total-details">
//                                 <p>Delivery Fee</p>
//                                 <p>&#x20B9;{getTotalCartAmount()===0?0:50}</p>
//                             </div>
//                             <hr />
//                             <div className="cart-total-details">
//                                 <b>Total</b>
//                                 <b>&#x20B9;{getTotalCartAmount()===0?0:getTotalCartAmount()+50}</b>
//                             </div>
//                         </div>
//                         <button onClick={orderinsert} >PROCEED TO PAYMENT</button>
//                     </div>
//           </div>
//         </form>
//       )
//     }
    
//     export default PlaceOrder



















    import React, { useContext,useEffect,useState } from 'react'
import './PlaceOrder.css'
import { useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'
//import { useHistory } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'

const url="http://localhost:4003/"

const PlaceOrder = () => {
    const [data,setdata]=useState({
        firstname:'',
        lastname:'',
        email:'',
        Street:'',
        City:'',
        State:'',
        phone:''
     })
    const {user, setUser,token } = useContext(StoreContext);
    const {success,setSuccess } = useContext(StoreContext);
    const {cartItems,food_list,getTotalCartAmount,setCartItems} = useContext(StoreContext);
   //const history = useHistory();
   const navigate=useNavigate();


   const orderinsert = async (event) => {
    event.preventDefault();
  
    const items = food_list.map(item => {
      if (cartItems[item._id] > 0) {
        return {
          item_id: item._id,
          images: url + item.image,
          quantity: cartItems[item._id],
          subtotal_price: item.price,
          price: item.price * cartItems[item._id],
        };
      }
      return null;
    }).filter(item => item !== null);
  
    console.log('Items:', items);
    if (items.length === 0) {
      console.error('No items in the cart');
      return;
    }
  
    try {
      const restaurantResponses = await Promise.all(items.map(item =>
        fetch(`http://localhost:8006/getrest/${item.item_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ));
  
      const failedResponses = restaurantResponses.filter(response => !response.ok);
      if (failedResponses.length > 0) {
        throw new Error('One or more network responses were not ok');
      }
  
      const restaurantData = await Promise.all(restaurantResponses.map(response => response.json()));
      const restaurantId = restaurantData[0].data[0].Restaurent_id;
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 5);
      currentDate.setMinutes(currentDate.getMinutes() + 30);
      const requestBody = {
        user_id: user,
        Restaurant_id: restaurantId,
        total_price: getTotalCartAmount() + 50,
        order_date: currentDate.toISOString(),
        status: 'pending',
        items,
      };
  
      const orderResponse = await fetch('http://localhost:8006/addorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(requestBody),
      });
  
      if (!orderResponse.ok) {
        if (orderResponse.status === 500) {
          throw new Error('Internal server error');
        }
      }
  
      const orderData = await orderResponse.json();
      if (orderData.success) {
        console.log('order_id:', orderData.order_id);
        console.log('Successfully added');
  
        const paymentData = {
          order_id: orderData.order_id,
          payment_Date: currentDate.toISOString(),
          payment_method: 'Credit card',
          payment_status: 'Pending',
          amount: getTotalCartAmount() + 50,
        };
  
        const paymentResponse = await fetch('http://localhost:8006/insertpayment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify(paymentData),
        });
  
        if (!paymentResponse.ok) {
          if (paymentResponse.status === 500) {
            throw new Error('Internal server error');
          }
        }
  
        const paymentDataResponse = await paymentResponse.json();
        if (paymentDataResponse.success) {
          setCartItems([]);
          console.log('Payment details inserted successfully');
        }


        
  try {
    const stripe = await loadStripe("pk_test_51PZngHJzC2rtGIgm4naf9i94wpjFHpBBlzlc4TUVlL5GGmJsdwDnhHKKueFhVMwlFQ76j73O108NfTsh2o944xn600LjWLNRDr");
    

    //const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    console.log(food_list)
    console.log(food_list.images)
   
    const items = food_list.map(item => {
      if (cartItems[item._id] > 0) {
        
          return {
              name:item.name,
              images:url+item.image,
              item_id: item._id,
              quantity: cartItems[item._id],
              subtotal_price: item.price,
              price: item.price * cartItems[item._id],
          };

          
      }
      return null;
  }).filter(item => item !== null);
  console.log("products",items)

  const body = {
      products: items,
      
            
  };

    const headers = {
      "Content-Type": "application/json"
    };

    const response = await fetch(`http://localhost:8007/create-checkout-session`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      setSuccess(false);
      throw new Error('Network response was not ok');
     
    }
    

    const session = await response.json();
  
       
          if (session) {
            const paymentupdateresponse = await fetch('http://localhost:8006/updatepayment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ order_id: orderData.order_id }),
            });
  
            if (!paymentupdateresponse.ok) {
              if (paymentupdateresponse.status === 500) {
                throw new Error('Internal server error');
              }
            }
  
            const paymentresponse = await paymentupdateresponse.json();
            if (paymentresponse.success) {
              console.log('Successfully updated payment status');
            }
  
           
  
            // Insert order items after order is created
            const orderItemsData = items.map(item => ({
              order_id: orderData.order_id,
              item_id: item.item_id,
              Quantity: item.quantity,
              subtotal_price: item.subtotal_price,
            }));
  
            const orderItemsResponse = await fetch('http://localhost:8006/order-items', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ items: orderItemsData }),
            });
  
            if (!orderItemsResponse.ok) {
              if (orderItemsResponse.status === 500) {
                throw new Error('Internal server error');
              }
            }
  
            const orderItemsResponseData = await orderItemsResponse.json();
            if (orderItemsResponseData.success) {
              console.log('Order items inserted successfully');
              console.log(orderItemsResponseData.items);

            
  
              const deliverydata = {
                order_id: orderData.order_id,
                delivery_date: currentDate.toISOString(),
                delivery_address: [{
                  firstname: data.firstname,
                  lastname: data.lastname,
                  email: data.email,
                  Street: data.Street,
                  City: data.City,
                  State: data.State,
                  phone: data.phone
                }],
                delivery_status: 'Food processing'
              };
  
              const deliveryResponse = await fetch('http://localhost:8006/delivery', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ deliverydata }),
              });
  
              if (!deliveryResponse.ok) {
                if (deliveryResponse.status === 500) {
                  throw new Error('Internal server error');
                }
              }
  
              const deliveryResponseData = await deliveryResponse.json();
              if (deliveryResponseData.success) {
                console.log('Delivery inserted successfully');
                setTimeout(() => {
                  navigate('/');
                }, 7000);
              }
            }
          } else {
            const paymentupdateresponse = await fetch('http://localhost:8006/updatepaymentfailure', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({ order_id: orderData.order_id }),
            });
  
            if (!paymentupdateresponse.ok) {
              if (paymentupdateresponse.status === 500) {
                throw new Error('Internal server error');
              }
            }
  
            const paymentresponse = await paymentupdateresponse.json();
            if (paymentresponse.success) {
              console.log('Successfully updated payment status to failure');
            }
          }

          const result = await stripe.redirectToCheckout({
            sessionId: session.id,
          });

          if (result.error) {
            console.error(result.error.message);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    } catch (error) {
      console.error('There was a problem with your fetch operation:', error);
    }
  };
  
  

  


    
    
    const handleinput=(event)=>
        {
            setdata(prev =>({...prev,[event.target.name]:[event.target.value]}))
            console.log('data',data);
        }
    
    
      return (
        <form  className='place-order'>
          <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
                <input type="text" name='firstname' onChange={handleinput}  placeholder='First name'/>
                <input type="text" name='lastname'  onChange={handleinput}  placeholder='Last name'/>
            </div>
            <input type="email"  name='email' onChange={handleinput} placeholder='Email address'/>
            <input type="text"  name='Street'  onChange={handleinput} placeholder='Street'/>
            <div className="multi-fields">
                <input type="text"  name='City' onChange={handleinput}  placeholder='City'/>
                <input type="text" name='State'  onChange={handleinput} placeholder='State'/>
            </div>
            {/* <div className="multi-fields">
                <input type="text"  name='Zip code' onChange={handleinput} placeholder='Zip code'/>
                <input type="text" name='Country' onChange={handleinput} placeholder='Country'/>
            </div> */}
             <input type="text"  name='phone' onChange={handleinput} placeholder='Phone'/>
          </div>
          <div className="place-order-right">
          <div className="cart-total">
                        <h2>Cart Total</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>&#x20B9;{getTotalCartAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>&#x20B9;{getTotalCartAmount()===0?0:50}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>&#x20B9;{getTotalCartAmount()===0?0:getTotalCartAmount()+50}</b>
                            </div>
                        </div>
                        <button onClick={orderinsert} >PROCEED TO PAYMENT</button>
                    </div>
          </div>
        </form>
      )
    }
    
    export default PlaceOrder









