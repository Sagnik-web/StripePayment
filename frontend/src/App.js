import logo from './logo.svg';
import './App.css';
import StripeChecout from 'react-stripe-checkout';
import { useState } from 'react';
import axios from 'axios'

function App() {

  const [product, setProduct] = useState({
    name:'React from FB',
    price:10,
    productBy:'abc'
  })

  const makePayment = async token =>{
    const body = {
      token,
      product
    }

    const headers = {
      "Content-Type": "application/json"
    }
  
    // const backendData = await axios.post('http://localhost:8282/payment',body)
  
    // console.log(backendData);
    return fetch(`http://localhost:8282/payment`, {
      method: "POST",
      headers,
      body:JSON.stringify(body)
    })
    .then(responce => {
      console.log("Responce", responce);
      const { status } = responce
      console.log("Status :", status );  
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeChecout
          stripeKey="pk_test_51JnFgQSCvEjGDAqSKcbaEgKbSvmu1bG8lNR8SoFxnq7ToRYK0WuHaWExZmNjcRVaygJ53ORZoESJvpId7kT4Fo87007zpx3MiG"
          token={makePayment}
          name='Buy React'
          amount={product.price * 100}
        >
          <button>Submit</button>
        </StripeChecout>
      </header>
    </div>
  );
}

export default App;
