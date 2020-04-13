import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap';

function Prediction(props) {
    const history = useHistory();
    let price = history.location.price;
    const e = 2.71828
    price = price**e
    if(price !== 0) {
    return (
        <div className="p-5">
            <h1 style={{textAlign: 'center'}}>We predict your AirBnB will list for about ${parseFloat(price).toFixed(2)} per night</h1>
            <br/>
           
            <p>We calculated these numbers based off of data we scraped from <a href="https://www.airbnb.com" target="_blank" rel="noopener noreferrer">airbnb.com</a>
            . We then cleaned the data with python code, and created a machine learning model on azure machine learning studio to predict 
            the value of a NY AirBnB rental per night.</p>
            <Button variant='outline-success' style={{ display: 'block', margin: 'auto' }}>Go List Your Property</Button>
        </div>
    )
    }
    else {
        return (
            <>
                <h1>Sorry, you must go back to the main page and submit another campaign to see the prediction</h1>
            </>
        )
    }
}

export default Prediction;