import axios from 'axios';
import React, { useEffect } from 'react'
import {PaystackButton} from 'react-paystack'
import { useNavigate } from 'react-router-dom';




function PaystackPayment({email, amount}) {

    // const navigate = useNavigate()

    // useEffect(()=>{
    //     if(!email || email === null){
    //         navigate('/login')
    //     }
    // }, [])

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // YYYYMMDDHHMMSS format
    const orderId = `order-${timestamp}`;
    var url = "http://127.0.0.1:5000"
    const config = {
        currency: "KES",
        reference : orderId,
        email: 'tembosuites@gmail.com',
        amount: amount * 130 * 100,
        publicKey: "pk_live_d8b205442a5c260dc219d2f427609c63688d3ccf"
    };

    const handleSuccess = (reference) =>{
        navigate('/checkout-success')
    }

    const handleClose = ()=>{
        navigate('/')
        console.log('closed')
    }
    
        
    const componentProps = {
        ...config,
        text : "Pay with Paystack",
        onSuccess: (reference) => handleSuccess(reference),
        onClose: handleClose
    }    



  return (
    <PaystackButton {...componentProps} />
  )
}

export default PaystackPayment