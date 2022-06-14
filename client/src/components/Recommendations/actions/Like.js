import React from 'react';

const Like = ({ userId, modifySuperficialChoices }) => (
  <button
    type="button"
    onClick={() => modifySuperficialChoices(userId, 'ADD_TO_LIKED_RESTAURANTS')}
  >
    <img class= "like-button" src="images/misc/like1.png" alt="Like User" />
  </button>
);

export default Like;
