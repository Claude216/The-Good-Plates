import React from 'react';
import Restaurants from '../components/Restaurants';
import Recommendation from '../components/Recommendation';
import Preferences from '../components/Preferences';
import Header from '../components/Header';
import Helmet from 'react-helmet';
import '../components/css/Home.css';
import Cover from '../components/Cover';
import Location from "../components/Location";
import Login from "../components/Login";
import { ApolloProvider } from '@apollo/client';
import { client } from '../index'
import { currAddress } from "../components/Location";

function Home() {
    const [data, setData] = React.useState([]);
    const [distance, setDistance] = React.useState(10);
    const [priceFilter, setPriceFilter] = React.useState('1,2,3,4');
    const [location, setLocation] = React.useState();
    const [likedRestaurants, setLikedRestaurants] = React.useState([]);
    var toMeters = 1600;


    function likedCallback(restaurant){
        const newLikedRestaurants = [...likedRestaurants];
        newLikedRestaurants.push(restaurant);
        setLikedRestaurants(newLikedRestaurants);
        //
    }

    // function loginCallback(item){
    //     console.log(item);
    //     console.log(likedRestaurants);

    // }

    function handlePriceFilter(priceOpt){
        setPriceFilter(priceOpt);
    }

    function handleLocationFilter(loc) {
        setLocation(loc);
    }   

    async function handleClick(pref){
        let params;
        var meters = distance * toMeters;
        if (location || currAddress){
            if (location) {
                params = {
                    term: pref,
                    radius: meters,
                    location: location,
                    price: priceFilter
                };
            }
            else if (currAddress){
                params = {
                    term: pref,
                    radius: meters,
                    latitude: currAddress.coords.latitude,
                    longitude: currAddress.coords.longitude,
                    price: priceFilter
                };
            }
            const options = {
                    method: "POST",
                    headers: {
                        'Content-type': "application/json"    
                    },
                    body: JSON.stringify(params)
            };
            const response =  await fetch("/api", options);
            const data1 = await response.json();
            setData(data1);
        }else {
            alert("Enter a location!");
        }

    };

    return (
        <div>
            <Helmet>
                <style>{'body { background-color: lightyellow; }'}</style>
            </Helmet>

            <header className="bar">
                <Header />
            </header>
            
            <div className="wrapper">
                <div className="coverpage">
                    <Cover />
                </div>
                 <hr className ="screen-bar"/>
                <a href="/#" id="login-section"> </a>                 
                    <div className="login-section">
                        <ApolloProvider client={client}>
                            <Login/>
                        </ApolloProvider>
                    </div>
                <a href="/#" id="location-section"> </a>
                <hr className="screen-bar"/>
                <div className = "content">
                   
                    <Location 
                        distance={distance} 
                        handleLocationFilter={handleLocationFilter}
                        setDistance={setDistance} 
                        handleClick={handleClick}
                    />
                </div>
                <a href="/#" id="preference-section"> </a>
                <hr className ="screen-bar"/>
                <div className="content">   
                    <Preferences handlePriceFilter={handlePriceFilter} handleClick={handleClick} data={data}/>
                </div>
                <a href="/#" id="recommended-section"> </a>
                <hr className ="screen-bar"/>
                {data.length > 0 ? <Recommendation data={data} callback={likedCallback}/> : "Loading recommendations"}
                <a href="/#" id="liked-section"> </a>
                <div>
                    <hr className ="screen-bar"/>
                    <h1 className="liked-header">Liked Restaurants</h1>
                    <div className="liked-container">
                        {likedRestaurants.length > 0 ? <Restaurants data={likedRestaurants}/> : "Loading liked restaurants"}
                    </div>
                </div>
                <script type="text/javascript" src="../components/Preferences.js">Hello</script>
            </div>
        </div>
    );
}

export default Home;
