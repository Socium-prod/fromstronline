import React from "react";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-container success">
      <CheckCircle className="icon success-icon" size={80} />
      <h1>Payment Successful!</h1>
      <p>Thank you for your purchase. Your order has been placed successfully.</p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default CheckoutSuccess;
