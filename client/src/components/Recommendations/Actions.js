import React from 'react';
import Dislike from './actions/Dislike';
import Like from './actions/Like';


const Actions = ({ restaurant, modifySuperficialChoices }) => (
  <div id="actions">
    <Dislike
      userId={restaurant.id}
      modifySuperficialChoices={modifySuperficialChoices}
    />
    <Like
      userId={restaurant.id}
      modifySuperficialChoices={modifySuperficialChoices}
    />
  </div>
);

export default Actions;
