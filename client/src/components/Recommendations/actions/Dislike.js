import React from 'react';

const Dislike = ({ userId, modifySuperficialChoices }) => (
  <button
    type="button"
    onClick={() => modifySuperficialChoices(userId, 'ADD_TO_DISLIKED_RESTAURANTS')}
  >
    <img src="images/misc/dislike1.png" alt="Dislike User" />
  </button>
);

export default Dislike;
