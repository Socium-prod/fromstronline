import React from "react";
import { XCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CheckoutError = () => {
  const navigate = useNavigate();

  return (
    <div className="checkout-container error">
      <XCircle className="icon error-icon" size={80} />
      <h1>Payment Failed</h1>
      <p>Oops! Something went wrong. Please try again or contact support.</p>
      <button onClick={() => navigate("/")}>Go to Home</button>
    </div>
  );
};

export default CheckoutError;
