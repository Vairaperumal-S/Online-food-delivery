import React, { useEffect, useState, useContext } from 'react';
import './Payment.css'
import { useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

const PaymentPage = () => {
    const location = useLocation();
    const { setSuccess, success } = useContext(StoreContext);
    const [paymentProcessing, setPaymentProcessing] = useState(true);

    useEffect(() => {
        const { state } = location;
        const orderId = state ? state.order_id : null;

        const simulatePayment = async () => {
            try {
                await new Promise(resolve => setTimeout(resolve, 3000));
                setSuccess(true);
                //console.log('Payment details inserted successfully');
            } catch (error) {
                console.error('Payment error:', error);
            } finally {
                setPaymentProcessing(false);
            }
        };

        if (orderId) {
            simulatePayment();
        } else {
            console.error('Order ID not found in location state.');
            setPaymentProcessing(false);
        }
    }, [location, setSuccess]);

    return (
        <div>
            <h1>Payment Page</h1>
            {paymentProcessing ? (
                <div>
                    <p>Processing payment...</p>
                </div>
            ) : (
                <div>
                    {success ? (
                        <div>
                        <p className="large-text">Payment successful
                                <span className="large-emoji">{'\u{1F60A}'}</span>
                             </p> 
                        </div>
                    ) : (
                        <div>
                        <p className="large-text">
//                                 Payment failed. Please try again. <span className="large-emoji">{'\u{1F622}'}</span>
                             </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PaymentPage;



// import React, { useEffect, useState, useContext } from 'react';
// import './Payment.css'
// import { useLocation } from 'react-router-dom';
// import { StoreContext } from '../../context/StoreContext';

// const PaymentPage = () => {
//     const location = useLocation();
//     const { setSuccess, success } = useContext(StoreContext);
//     const [paymentProcessing, setPaymentProcessing] = useState(true);

//     useEffect(() => {
//         const { state } = location;
//         const orderId = state ? state.order_id : null;

//         const simulatePayment = async () => {
//             try {
//                 await new Promise(resolve => setTimeout(resolve, 3000));
//                 // Simulate payment success or failure
//                 const isSuccess = Math.random() > 0.5; 
//                 if (isSuccess==='   Payment successful! ') {
//                     setSuccess(true);
//                     console.log('Payment details inserted successfully');
//                 } else {
//                     setSuccess(false);
//                     console.log('Payment failure');
//                 }
//             } catch (error) {
//                 console.error('Payment error:', error);
//                 setSuccess(false);
//             } finally {
//                 setPaymentProcessing(false);
//             }
//         };

//         if (orderId) {
//             simulatePayment();
//         } else {
//             console.error('Order ID not found in location state.');
//             setPaymentProcessing(false);
//         }
//     }, [location, setSuccess]);

//     return (
//         <div>
//             {/* <h1>Payment Page</h1> */}
//             {paymentProcessing ? (
//                 <div>
//                     <p>Processing payment...</p>
//                 </div>
//             ) : (
//                 <div>
//                     {success ? (
//                         <div>
//                              <p className="large-text">
//                                 Payment successful! <span className="large-emoji">{'\u{1F60A}'}</span>
//                             </p>

//                         </div>
//                     ) : (
//                         <div>

//                         <p className="large-text">
//                                 Payment failed. Please try again. <span className="large-emoji">{'\u{1F622}'}</span>
//                             </p>
//                             {/* <p>Payment failed. Please try again.</p> */}
//                         </div>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default PaymentPage;


