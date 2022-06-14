import React from 'react';
import Card from '@material-ui/core/Card';
import Actions from './Actions';
import { CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';

const Restaurant = ({ restaurant, modifySuperficialChoices }) => {
  const { name, image_url, distance, rating, price, review_count} = restaurant;

var toMiles = 1600;
var miles = (distance / toMiles).toFixed(1);
  return (
    <>
      <Card className='recom-container'>
        <CardActionArea className='restaurant'>
          <CardMedia
            className='restaurant-photo'
            component='img'
            alt='restaurant-photo'
            image={image_url}
            title={name}
          />
          <CardContent>
            <Typography variant='h5' component='h2'className='restuarant-name'>
                {name}
            </Typography>
            <Typography color='textSecondary' className='restaurant-miles'>
              {miles}mi
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardContent>
            <Typography className='restaurant-rating' color='textSecondary'>
                {'•'}rating: {rating} {'  •'}{price} {'  •'}{review_count} reviews
            </Typography>
        </CardContent>
      </Card>
      <Actions
        restaurant={restaurant}
        modifySuperficialChoices={modifySuperficialChoices}
      />
    </>
  );
};

export default Restaurant;
