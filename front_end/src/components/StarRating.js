import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import '../styles/components/StarRating.scss';

const StarRating = ({ rating }) => {
  const totalStars = rating.reduce((sum, review) => sum + review.rating, 0);
  const averageStars = totalStars / rating.length;

  return (
    <div className="star-rating">
      {averageStars > 0 &&
        Array.from({ length: 5 }, (_, key) => {
          if (key < averageStars)
            return <FontAwesomeIcon icon={faStar} className="star-active" key={key} />;
          else
            return (
              <FontAwesomeIcon
                icon={faStar}
                className="star"
                key={key}
              />
            );
        })}
    </div>
  );
};

export default StarRating;
