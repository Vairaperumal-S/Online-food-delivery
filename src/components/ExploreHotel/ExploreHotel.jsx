import React, { useContext } from 'react'
import './ExploreHotel.css'
import { hotel_list } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const ExploreHotel = ({ hotel, sethotel}) => {


    const {wordEntered,setwordEntered} = useContext(StoreContext)

    return (
        <div className="explore-hotel-container">
            <div className='explore-hotel' id='explore-hotel'>
                <h1>Top brands for you</h1>
                <div className="explore-hotel-list">
                    {hotel_list.map((item, index) => {

                            if (wordEntered === item.hotel_name ) {
                                    sethotel(item.hotel_id);
                            }
                           

                        return (
                            <div onClick={() => {sethotel(prev => prev == item.hotel_id ? 0 : item.hotel_id);setwordEntered(prev=>prev !=""?"":"")}} key={index} className="explore-hotel-list-item">
                                <figure>
                                   
                                    <img className={hotel === item.hotel_id ? "active1" : ""} src={item.hotel_image} loading='eager' alt="" />
                                   
                                    <p>{item.hotel_name}</p>
                                </figure>
                            </div>
                        )
                    })}
                </div>
                {/* <hr /> */}
            </div>
        </div>

    )
}

export default ExploreHotel
