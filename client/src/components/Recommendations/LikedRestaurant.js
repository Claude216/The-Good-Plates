import React from 'react';

const LikedRestaurant = ({ restaurant }) => (
  <div className="liked-restaurant">
    <div className="liked-restaurant-image">
      <img
        src={restaurant.image_url}
        alt={`You liked ${restaurant.name}`}
      />
    </div>
  </div>
);

export default LikedRestaurant;
