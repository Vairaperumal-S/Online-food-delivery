// import React, { useState, useEffect } from 'react';
// import './Orders.css'
// import {toast} from 'react-toastify'
// const OrdersList = () => {
//   const [orders, setOrders] = useState([]);

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch('http://localhost:8006/orderdetails', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         credentials: 'include'
//       });
//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         setOrders(data);
//       } else {
//         console.error('Failed to fetch orders');
//       }
//     } catch (error) {
//       console.error('Error fetching orders:', error);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   return (
//     <div className='my-orders'>
//       <h1> Order Page</h1>
//       <div className='container'>
//         {orders.length === 0 ? (
//           <p>No orders found.</p>
//         ) : (
//           <table className='orders-table'>
//             <thead>
//               <tr>
//                 <th>Order ID</th>
//                 <th>Order Date</th>
//                 <th>Item Name</th>
//                 <th>Quantity</th>
//                 <th>Total Price</th>
//                 <th>Address</th>
//                 <th>Order Status</th>
                
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) => (
//                 <tr key={index}>
//                   <td>{order.order_id}</td>
//                   <td>{new Date(order.order_date).toLocaleString()}</td>
//                   <td>{order.item_names}</td>
//                   <td>{order.total_quantity}</td>
//                   <td>{order.total_price}</td>
//                   <td> <p>{order.firstname},{order.email},{order.Street},{order.City},{order.State},{order.phone}</p></td>
//                   <td>
//                    <select>
//                    <option value='Food processing'>Food processing</option>
//                    <option value='Out for delivery'>Out for delivery</option>
//                    <option value='Delivered'>Delivered</option>
//                    </select>
//                   </td>
                
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </div>
//   );
// };

// export default OrdersList;


import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:8006/orderdetails', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const response = await fetch('http://localhost:8006/updatedelivery', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ order_id: orderId, status: newStatus })
      });

      if (response.ok) {
        // If the update is successful, fetch orders again to update the UI
        fetchOrders();
        toast.success('Delivery status updated successfully');
      } else {
        toast.error('Failed to update delivery status');
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
      toast.error('Error updating delivery status');
    }
  };

  return (
    <div className='my-orders'>
      <h1> Order Page</h1>
      <div className='container'>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <table className='orders-table'>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Address</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{new Date(order.order_date).toLocaleString('en-IN', {timeZone: 'Asia/Kolkata'})}</td>

                  <td>{order.item_names}</td>
                  <td>{order.total_quantity}</td>
                  <td>{order.total_price}</td>
                  <td>
                    <p>
                      {order.firstname}, {order.email}, {order.Street}, {order.City}, {order.State}, {order.phone}
                    </p>
                  </td>
                  <td>
                    <select
                      value={order.delivery_status}
                      onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
                    >
                      <option value='Food processing'>Food processing</option>
                      <option value='Out for delivery'>Out for delivery</option>
                      <option value='Delivered'>Delivered</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrdersList;










