import React, { useState , useEffect} from 'react';
import Restaurant from './Recommendations/Restaurant';
import Done from './Recommendations/Done';
import "./css/Home.css";


// removes restaurants with given tag
function categoryRemoveFromList (array, tag){

  const newArr = [];
  var arrlength = array.length;

  for (let i = 0; i < arrlength; i++){

    var tempRes = array[i];
    if (!tempRes.categories.some( e => e.alias === tag )){
        newArr.push(tempRes);
    }

  }

  //console.log(allRestaurants);

  return newArr;
};


function Recommendation(recprops) {
  const [allRestaurants, setAllRestaurants] = useState(recprops.data);
  const [unlikedRestaurants, setUnlikedRestaurants] = useState(recprops.data);
  const [likedRestaurants, setLikedRestaurants] = useState([]);
  const [dislikedRestaurants, setDislikedRestaurants] = useState([]);

  console.log(recprops.data);

  useEffect( () => {
    const diff = recprops.data.filter(({ id: r1 }) => !allRestaurants.some(({ id: r2 }) => r1 === r2));
    const newUnliked = [...unlikedRestaurants, ...diff];
    shuffleArr(newUnliked);

    setUnlikedRestaurants(newUnliked);
    const newAllRestaurants = [...allRestaurants, ...diff];
    setAllRestaurants(newAllRestaurants);
  },[recprops.data] );

  function prioCompare (a, b){

    if (a["prio"] > b["prio"]){
      return -1;
    }
    if (a["prio"] < b["prio"]){
      return 1;
    }
    return 0;

  }
  function shuffleArr(array){
    var currentIndex = array.length, randomIndex;

    while (currentIndex !== 0){
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      let temp = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temp;
    }
  }

  const likedPriorityChange = (restaurant) => {
    const restaurantCategories = restaurant.categories;
    const restaurantCategoriesLength = restaurantCategories.length;

    for (let i = 0 ; i < unlikedRestaurants.length; i++){

      let tempRes = unlikedRestaurants[i];
      for (let j = 0; j < restaurantCategoriesLength; j++){
        if (tempRes.categories.some( e => e.alias === restaurantCategories[j].alias )){
          tempRes = unlikedRestaurants[i];
          tempRes["prio"] += 1;
        }
      }

    }
    
    unlikedRestaurants.sort(prioCompare);
    
  }

  const removedRestaurantFromDataSrc = (restaurantSource, restaurantId) =>
    restaurantSource.filter(restaurant => restaurant.id !== restaurantId);

  const modifySuperficialChoices = (restaurantId, action) => {
    const newLikedRestaurants = [...likedRestaurants];
    const newDislikedRestaurants = [...dislikedRestaurants];

    switch (action) {
      case 'ADD_TO_LIKED_RESTAURANTS':
        if (!likedRestaurants.some(x => x.id === restaurantId)) {
          const likedRes = unlikedRestaurants[0]

          likedPriorityChange(likedRes);

          newLikedRestaurants.push(likedRes);
          recprops.callback(likedRes);
          setLikedRestaurants(newLikedRestaurants);
          setUnlikedRestaurants(removedRestaurantFromDataSrc(unlikedRestaurants, restaurantId));
        }
        break;
      case 'ADD_TO_DISLIKED_RESTAURANTS':
        if (!dislikedRestaurants.some(x => x.id === restaurantId)) {
          newDislikedRestaurants.push(unlikedRestaurants.find(item => item.id === restaurantId));

          setDislikedRestaurants(newDislikedRestaurants);
          setUnlikedRestaurants(removedRestaurantFromDataSrc(unlikedRestaurants, restaurantId));
        }
        break;
      default:
        return unlikedRestaurants;
    }
  };

  return (
    <div>
      <div className="app">
        {unlikedRestaurants[0] ? (
          <Restaurant
            key={unlikedRestaurants[0].id}
            restaurant={unlikedRestaurants[0]}
            modifySuperficialChoices={modifySuperficialChoices}
            likedRestaurants={likedRestaurants}
          />
        ) : (
          <Done
            //activeUserImage={people[activeUser].image}
            likedRestaurants={likedRestaurants}
            //superLikedUsers={superLikedUsers}
          />
        )}
      </div>
    </div>
  );
};
export default Recommendation;