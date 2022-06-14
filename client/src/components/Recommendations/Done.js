import React from 'react';

const Done = ({ likedRestaurants }) => (
  <div id="lonely">
    <p>There's no new restaurants around you.</p>

    <span className="pulse">
      {/*<img src={`/images/users/${activeUserImage}`} alt="You..." />*/}
    </span>

    <div id="liked-people">
      <p>
        {likedRestaurants.length > 0
          ? "Change your preferences to find more restaurants!"
          : ''}
      </p>
    </div>
  </div>
);

export default Done;
