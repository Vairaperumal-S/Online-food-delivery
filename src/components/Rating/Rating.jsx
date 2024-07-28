import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';
import './Rating.css';

const Rating = ({ rating }) => {
    // Ensure rating is a number and within the range of 0 to 5
    const validatedRating = typeof rating === 'number' && rating >= 0 && rating <= 5 ? rating : 0;

    const fullStars = Math.floor(validatedRating);
    const hasHalfStar = validatedRating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
        <div className="rating-container">
          
            {[...Array(fullStars)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} className="star full-star" />
            ))}
            
            {hasHalfStar && <FontAwesomeIcon icon={faStarHalfAlt} className="star half-star" />}
            
            {[...Array(emptyStars)].map((_, i) => (
                <FontAwesomeIcon key={i + fullStars + (hasHalfStar ? 1 : 0)} icon={faStarRegular} className="star empty-star" />
            ))}
        </div>
    );
};

export default Rating;
