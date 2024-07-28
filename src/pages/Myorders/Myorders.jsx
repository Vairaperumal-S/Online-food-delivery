// import React, { useEffect, useState, useContext } from 'react';
// import './Myorders.css';
// import parcel from './parcel_icon.png'; // Ensure the path is correct
// import { StoreContext } from '../../context/StoreContext';

// const Myorders = () => {
//     const { url, token, user } = useContext(StoreContext);
//     const [data, setData] = useState([]);

//     console.log('user:', user);

//     const fetchOrders = async () => {
//         try {
//             const response = await fetch(`http://localhost:8003/userdetails/${user}`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Bearer ${token}`, // Ensure token is passed if required by the backend
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (!response.ok) {
//                 console.error('Error fetching orders:', response.statusText);
//                 return;
//             }

//             const responseData = await response.json();
//             console.log('Response data:', responseData);

//             setData(responseData);
//         } catch (error) {
//             console.error('Fetch orders error:', error);
//         }
//     };

//     useEffect(() => {
//         if (token) {
//             fetchOrders();
//         }
//     }, [token]);

//     return (
//         <div className='my-orders'>
//             <h1>My Orders</h1>
//             <div className='container'>
//                 <pre>{JSON.stringify(data, null, 2)}</pre>
                
//                 {data.map((order, index) => {
//                     return (
//                         <div key={index} className='my-orders-order'>
//                             <img src={parcel} alt='parcel image is loading' />
//                             <div className='order-details'>
//                                 <p>Order Date: {order.order_date}</p>
//                                 <p>Item ID: {order.item_id}</p>
//                                 <p>Item name: {order.name} x {order.quantity}</p>
//                                 <p>Quantity: {order.quantity}</p>
//                                 <p>Total Price: {order.total_price}</p>
//                             </div>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default Myorders;





import React, { useEffect, useState, useContext } from 'react';
import './Myorders.css';
//import parcel from './parcel_icon.png';
import { StoreContext } from '../../context/StoreContext';

const Myorders = () => {
    const { url, token, user } = useContext(StoreContext);
    const [data, setData] = useState([]);

    console.log('user:', user);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`http://localhost:8006/userdetails/${user}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Ensure token is passed if required by the backend
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                console.error('Error fetching orders:', response.statusText);
                return;
            }

            const responseData = await response.json();
            console.log('Response data:', responseData);

            setData(responseData);
        } catch (error) {
            console.error('Fetch orders error:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className='my-orders'>
            <h1>My Orders</h1>
            <div className='container'>
                {data.length === 0 ? (
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
                                {/* <th>Description</th> */}
                                <th>Order Status</th>
                                {/* <th>Track Orders</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.order_id}</td>
                                    <td>{new Date(order.order_date).toLocaleString()}</td>
                                    {/* <td>{order.name}</td>
                                    <td>{order.quantity}</td> */}
                                    <td>{order.item_names}</td>
                                    <td>{order.total_quantity}</td>
                                    <td>{order.total_price}</td>
                                    <td>
  <p>
    <span style={{color:'red'}}>&#x25cf;</span> 
    <b>{order.delivery_status}</b>
  </p>

</td>
{/* <td>
    <button className='but'>Track Orders</button>
</td> */}
                                    {/* <td><p><span>&#x25cf</span> <b>{order.delivery_status}</b></p></td> */}
                                    {/* <td>{order.description}</td> */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};


export default Myorders;







