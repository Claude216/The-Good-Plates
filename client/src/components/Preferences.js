import React from 'react';
import './css/Home.css';
import { ButtonGroup, Button, Fab } from '@material-ui/core';
import Burger_icon from '../images/pref_food_icons/burger.png';
import Mexican_icon from '../images/pref_food_icons/mexican.png';
import Chinese_icon from '../images/pref_food_icons/chinese.png';
import Pizza_icon from '../images/pref_food_icons/pizza.png';
import Dessert_icon from '../images/pref_food_icons/dessert.png';
import Breakfast_icon from '../images/pref_food_icons/breakfast.png';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formheader: {
        width: "62.5vw",
        alignContent: "center",
    },
}));

const theme = createTheme({
    palette: {
        primary: {
            main: "#7689de"
        },
        secondary: {
            main: "#525f9b"
        }
    }
});

function Preferences(props1) {
    const classes = useStyles();

    const [input, setInput] = React.useState('');
    const [tags, setTags] = React.useState([]);
    const [apiTags, setApiTags] = React.useState([]);
    const [priceBtn, setPriceBtn] = React.useState();

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
      
        if (key === 'Enter' && trimmedInput.length) {
          e.preventDefault();
          if (!tags.includes(trimmedInput)){
            var prefString = `${trimmedInput}`;
            setTags(prevState => [...prevState, trimmedInput.toLowerCase()]);
            props1.handleClick(prefString);
          } else {
            alert("Preference already entered. Try another one!")
          }
          setInput('');
        }
      };

    function preferenceString(pref){
        if (!tags.includes(pref)){
            let prefString = `${pref}`;
            setApiTags(prevState => [...prevState, prefString]);
            setTags(prevState => [...prevState, pref.toLowerCase()]);
        } else {
            alert("Preference already entered. Try another one!")
        }
    };

    function apiPreferenceCalls(prefArray) {
        prefArray.map((pref) => props1.handleClick(pref))
    }

    function removePreference(tag) {
        let prefString = `${tag}`;
        console.log(tag);
        setTags(tags.filter(item => item !== tag));
        setApiTags(apiTags.filter(item => item !== prefString));
    }

    function handlePrice(price){
        let priceString = '';
        for (let i=0; i < price; i++){
            priceString = priceString + "$";
        }
        setPriceBtn(price);
        props1.handlePriceFilter(price);
    };

    return (
        <div>
            <form className="Preference-Section">
                <h1 className="form-header">
                    What are your interests?
                </h1>
                <div>
                    <ButtonGroup variant="text">
                        {tags.map((tag) => <Button onClick={() => removePreference(tag)}>{tag}</Button>)}
                    </ButtonGroup>
                </div>
                <div>
                    <ThemeProvider theme={theme}>
                        <ButtonGroup className='price-buttons'>
                            <ThemeProvider theme={theme}>
                                <Button size='small' variant='contained' color={priceBtn === '1'? 'secondary': 'primary'} onClick={() => handlePrice('1')}>$</Button>
                                <Button size='small' variant='contained' color={priceBtn === '2'? 'secondary': 'primary'} onClick={() => handlePrice('2')}>$$</Button>
                                <Button size='small' variant='contained' color={priceBtn === '3'? 'secondary': 'primary'} onClick={() => handlePrice('3')}>$$$</Button>
                                <Button size='small' variant='contained' color={priceBtn === '4'? 'secondary': 'primary'} onClick={() => handlePrice('4')}>$$$$</Button>
                            </ThemeProvider>
                        </ButtonGroup>
                    </ThemeProvider>
                </div>
                <label className="preference-bar">
                    <input 
                        name="name" 
                        placeholder="Type your Preferences" 
                        value = {input}
                        onChange = {onChange}
                        onKeyDown = {onKeyDown}
                    />
                </label>
                <div className="button-container">    
                    <button className="my-button btn btn-lg" type="button" onClick={() => preferenceString('asian')}>
                        Asian
                        <img className='preference-icon' alt="" src={Chinese_icon}/>
                    </button>
                    <button className="my-button btn btn-lg" type="button" onClick={() => preferenceString('spanish')}>
                        Spanish
                        <img className='preference-icon' alt="" src={Mexican_icon}/>
                    </button>
                    <button className="my-button btn btn-lg" type="button" onClick={() => preferenceString('european')}>
                        European
                        <img className='preference-icon' alt="" src={Pizza_icon}/>
                    </button>
                    <button className="my-button btn btn-lg" type="button" onClick={() => preferenceString('american')}>
                        American
                        <img className='preference-icon' alt="" src={Burger_icon}/>
                    </button>
                    <button className="my-button btn btn-lg" type="button" onClick={() => preferenceString('breakfast')}>
                        Breakfast
                        <img className='preference-icon' alt="" src={Breakfast_icon}/>
                    </button>
                    <button className="my-button btn btn-lg" type="button" onClick={() => preferenceString('dessert')}>
                        Dessert
                        <img className='preference-icon' alt="" src={Dessert_icon}/>
                    </button>
                </div>
            </form>
            <br/>
            <form>
                <Fab variant='extended' className={classes.formheader} onClick={() => apiPreferenceCalls(apiTags)}>
                    Submit
                </Fab>
            </form>
        </div>    

    );
}

export default Preferences;