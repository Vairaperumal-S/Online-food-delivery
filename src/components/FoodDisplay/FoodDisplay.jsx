// import React, { useContext, useEffect, useState } from 'react'
// import './FoodDisplay.css'
// import { StoreContext } from '../../context/StoreContext'
// import FoodItem from '../FoodItem/FoodItem'

// const FoodDisplay = ({category,hotel}) => {
 

   
//     const {food_list} = useContext(StoreContext)
//     const fetchRestaurantName = async (Restaurant_id) => {
//       try {
//           const response = await fetch(`http://localhost:5001/restaurantname/${Restaurant_id}`);
//           if (!response.ok) {
//               throw new Error(`HTTP error! Status: ${response.status}`);
//           }
//           const data = await response.json();
//           return data.data; 
//       } catch (error) {
//           console.error(`Error fetching restaurant name for Restaurant_id ${Restaurant_id}:`, error);
//           return 'Restaurant Not Found'; 
//       }
//   };
  
//   return (
//     <div className='food-display' id='food-display'>
//       <h2>Top dishes near you</h2>
//       <div className="food-display-list">
//         {food_list.map((item,index)=>{
//             if ((category==="All" && item.AVAILABILITY==1|| category==item.category && item.AVAILABILITY==1)  && (hotel===0|| hotel==item.Restaurent_id)) 
//             {

            
              
//                 return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} Restaurant_name={fetchRestaurantName(item.Restaurent_id)}/>    
//             }
            
//         })}




       





      
//       </div>
//     </div>
//   )
// }

// export default FoodDisplay




import React, { useContext, useEffect, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';
import Review from '../../components/Review/Review';

const FoodDisplay = ({ category, hotel }) => {
    const { food_list } = useContext(StoreContext);
    const [restaurantNames, setRestaurantNames] = useState({});
    const [rating,sertrating]=useState({})

    useEffect(() => {
        const fetchRestaurantNames = async () => {
            const uniqueRestaurantIds = [...new Set(food_list.map(item => item.Restaurent_id))];
            const namesMap = {};
            const ratingmap={};

            for (const id of uniqueRestaurantIds) {
                try {
                    const response = await fetch(`http://localhost:5001/restaurantname/${id}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch restaurant name for Restaurant_id ${id}`);
                    }
                    const data = await response.json();
                    namesMap[id] = data.data.Restaurant_name;
                    ratingmap[id]=data.data.Rating; // Accessing the Restaurant_name from the data object
                } catch (error) {
                    console.error(`Error fetching restaurant name for Restaurant_id ${id}:`, error);
                    namesMap[id] = 'Restaurant Not Found';
                    ratingmap[id] ='0'// Placeholder or error handling
                }
            }

            setRestaurantNames(namesMap);
            sertrating(ratingmap);
        };

        fetchRestaurantNames();
    }, [food_list]);

    return (
        <div className='food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.map((item, index) => {
                    if ((category === "All" || category === item.category) && item.AVAILABILITY === 1 &&
                        (hotel === 0 || hotel === item.Restaurent_id)) {
                        return (
                          <div key={index}>
                            <FoodItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                Restaurant_name={restaurantNames[item.Restaurent_id] || 'Loading...'}
                                Rating={rating[item.Restaurent_id] || 'Loading...'} // Show loading or default text
                            />
                            
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default FoodDisplay;

