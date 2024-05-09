import React from 'react'
import './ExploreHotel.css'
import { hotel_list } from '../../assets/assets'

const ExploreHotel = ({ hotel, sethotel }) => {
    return (
        <div className="explore-hotel-container">
            <div className='explore-hotel' id='explore-hotel'>
                <h1>Top brands for you</h1>
                <div className="explore-hotel-list">
                    {hotel_list.map((item, index) => {
                        return (
                            <div onClick={() => sethotel(prev => prev === item.hotel_name ? "Every" : item.hotel_name)} key={index} className="explore-hotel-list-item">
                                <figure>
                                   
                                    <img className={hotel === item.hotel_name ? "active1" : ""} src={item.hotel_image} loading='eager' alt="" />
                                   
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
