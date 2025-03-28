import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import '../Styles/PaymentStatus.css'
import { useAuth } from "../Context/Authcontext";

const url = 'http://127.0.0.1:5000'
const liveurl = 'https://online-store-backend-plct.onrender.com'


function PaymentStatus() {
  const location = useLocation();
  const navigate = useNavigate();
  const hasCheckedStatus = useRef(false); // Prevent multiple triggers
  const { user } = useAuth()

  useEffect(() => {
    if (hasCheckedStatus.current) return; // Stop duplicate requests
    hasCheckedStatus.current = true; // Mark as executed

    const queryParams = new URLSearchParams(location.search);
    const orderTrackingId = queryParams.get("OrderTrackingId");

    if (orderTrackingId) {
      checkPaymentStatus(orderTrackingId);
    }
  }, [location]); // No dependencies that change

  const checkPaymentStatus = async (orderTrackingId) => {
    try {
      const response = await axios.get(`${liveurl}/api/check-payment-status/${orderTrackingId}`);
      const status = response.data.payment_status_description;
      if (status === "Completed") {
          navigate("/checkout-success");
      } else {
          navigate("/checkout-fails");
        }   
    } catch (error) {
      navigate('/')
      console.error("Error checking payment status:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="payment-status-container"
    >
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <h2>Checking payment status...</h2>
    </motion.div>
  );
}

export default PaymentStatus;
