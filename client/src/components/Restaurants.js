import React from 'react';
import Card from '@material-ui/core/Card';
import { CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import './css/Home.css';

/**
 * This function goes through every one of the liked restaurants and displays 
 * the restaurant image, name, and rating in a card
 * @param {*} props 
 * @returns  All the restaurants the user has liked
 */
function Restaurant(props) {
    const Style = {
        height: '20vh',
    }
    return (
        <> 
            {props.data.map((restaurant,index) => (
                <Card className='liked-size'>
                    <CardActionArea className='liked'>
                        <CardMedia
                            style={Style}
                            className='liked-pic'
                            component='img'
                            alt='restaurant-photo'
                            image={restaurant.image_url}
                            title={restaurant.name}
                        />
                        <CardContent>
                            <Typography variant='body1' component='h2'>
                                {restaurant.name}
                            </Typography>
                            <Typography color='textSecondary'>
                                {restaurant.location.address1} {' '}
                                {restaurant.location.city}, {' '}
                                {restaurant.location.state} {restaurant.location.zip_code}
                            </Typography>
                            <Typography color='textSecondary' className='liked-ratings'>
                                {restaurant.rating}{'★'}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </> 
    );
}

export default Restaurant;