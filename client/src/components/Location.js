import React from 'react';
import "./css/Home.css";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import PlacesAutoComplete, { geocodeByAddress } from "react-places-autocomplete";
import { Button } from '@material-ui/core';

export var currAddress = "";

function Location(props) {
    const [addy, setAddy] = React.useState("");
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        setAddy(value);
        props.handleLocationFilter(results[0].formatted_address);
    }

    const handleSliderChange = (event, newValue) => {
        props.setDistance(newValue);
    };

    const handleInputChange = (event) => {
        props.setDistance(event.target.value === '' ? '' : Number(event.target.value));
    };

    const handleBlur = () => {
        if (props.distance < 0) {
            props.setDistance(0);
        } else if (props.distance > 100) {
            props.setDistance(100);
        }
    };

    function getUserLocation() {
        const message = document.querySelector('#message');

        // check if the Geolocation API is supported
        if (!navigator.geolocation) {
            message.textContent = `Your browser doesn't support Geolocation`;
            message.classList.add('error');
            return;
        }

        // handle click event
        const btn = document.querySelector('#show');
        btn.addEventListener('click', function () {
            // get the current position
            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        });


        // handle success case
        function onSuccess(position) {
            const {
                latitude,
                longitude
            } = position.coords;

            // message.classList.add('success');
            // message.textContent = `Your location: (${latitude},${longitude})`;
            currAddress = position;
            // getReverseGeocodingData(position.coords.latitude, position.coords.longitude);
        }

        // handle error case
        function onError() {
            message.classList.add('error');
            message.textContent = `Failed to get your location!`;
        }

    };

    return (
        <>
            <p id='location-header'> Enter your location </p>
            <div className="searchbar">
                <Grid container spacing={0}>
                    <Grid item xs={9}>
                        <PlacesAutoComplete
                            value={addy}
                            onChange={setAddy}
                            onSelect={handleSelect}
                        >

                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div className="address">

                                    <input className="type-addi"{...getInputProps({ placeholder: "Type address" })} />

                                    <div>
                                        {console.log(suggestions)}
                                        {suggestions.map(suggestion => {
                                            const style = {
                                                backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                                            };

                                            return (
                                                <div className='loc-dropdown' {...getSuggestionItemProps(suggestion, { style })}>
                                                    {suggestion.description}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutoComplete>
                    </Grid>
                    <Grid item className='Currlocation-btn'>
                        <Button variant="contained" size='small' color="primary" id={"show"} className = "btn-default" onClick={getUserLocation}>
                            Current Location
                        </Button>
                    </Grid>
                </Grid>
            </div>

            <div className='distance-slider'>
                <Grid container spacing={2}>
                    <Grid item xs>
                        <Slider
                            min={5}
                            max={25}
                            value={typeof props.distance === 'number' ? props.distance : 0}
                            onChange={handleSliderChange}
                            aria-labelledby="input-slider"
                        />
                    </Grid>
                    <Grid item>
                        <Input
                            value={props.distance}
                            margin="dense"
                            onChange={handleInputChange}
                            onBlur={handleBlur}
                            inputProps={{
                                step: 5,
                                min: 0,
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                        <Typography>miles</Typography>
                    </Grid>
                </Grid>
            </div>
            <div className="background">
                <img id="map-icon" src="https://cdn.mos.cms.futurecdn.net/cgNja7vCHHvsfP3gtfd2wg.jpg" alt="" />
            </div>
        </>
    );
}

export default Location;
