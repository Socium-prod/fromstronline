import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const url = 'http://127.0.0.1:5000'
const liveurl = 'https://online-store-backend-plct.onrender.com'


import PaystackPayment from "./PaystackPayment";
import "../Styles/checkout.css";

function Checkout() {
  const location = useLocation();
  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1);
  const [checkoutError, setCheckoutError] = useState(false);

  const { id, reference, lastname, firstname, productName, amount, email } = location.state;

  // Calculate total price dynamically
  const totalPrice = (amount * quantity).toFixed(2);


  const handleCheckoout = async ()=>{

    try {
      const response = await axios.post(`${liveurl}/api/payment-process`,{ id, reference, lastname, firstname, productName, totalPrice ,email})
      if(response.status == 200){
        window.location.href = response.data.redirect_url
      }
      
    } catch (error) {
      console.error(error)
    }

  }
 

  return (
    <div className="checkout-container">
      <div className="checkout-box">
        <h2 className="title">Order Summary</h2>
        {/* <h1 style={{ color: "red", fontFamily: "Space Mono", fontSize: "18px", fontWeight: "800"}} >NOTICE :  We are in test Mode! For payment Consult +254708784942. We will not be liable for any payment till this message disappears</h1>  */}
        <div className="product-summary">
          <h3>Product: <span>{productName}</span></h3>
          <h4>Price per item: <span>${amount}</span></h4>

          {/* Quantity Input */}
          <div className="quantity-input">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="text"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
          </div>

          <h4>Total Price: <span>${totalPrice}</span></h4>
          <h5>Estimated Delivery: <span>3 working days</span></h5>
        </div>
      <button onClick={handleCheckoout} >Pay with pesapal</button>
      <PaystackPayment user_id={id} reference={reference} productName={productName} email={email} quantity={quantity} amount={totalPrice}  />
      </div>
    </div>
  );
}

export default Checkout;



