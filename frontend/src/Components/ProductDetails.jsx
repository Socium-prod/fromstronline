import React, {useEffect, useState} from 'react'
import {useParams, useNavigate, Link} from'react-router-dom'
import axios from 'axios'
import '../Styles/productdetail.css'
import { useAuth } from '../Context/Authcontext'

function ProductDetails() {
  const navigate = useNavigate()
  const { id } = useParams(); // Get the 'id' from the URL parameters
  const [product, setProduct] = useState({}); // State to store the product details
  const [loading, setLoading] = useState(true); // State to handle loading state
  const [error, setError] = useState(null); 
  
  const { user, logout } = useAuth()  
  
  const isAuthenticated = user ? true : false
const url = 'http://127.0.0.1:5000'
const liveurl = 'https://online-store-backend-plct.onrender.com'


  useEffect(()=>{
    if (!user) {
      navigate('/login'); // Redirect to login if not authenticated
      return;
    }
  
    axios.get(`${liveurl}/products/${id}`)
    .then(response=>{{
      setProduct(response.data)
      setLoading(false)
    }})
    .catch(error=>{
      setError(error.message)
    })

  }, [])

  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // YYYYMMDDHHMMSS format
  const orderId = `order-${user.id}-${timestamp}`;

  const handleCheckout = () => {
    console.log(user)
    if (isAuthenticated) {
      navigate(
        `/checkout`, {state: {id: user.id, reference: orderId, lastname: user.lastname, firstname: user.firstname, productName: product.name, amount: product.price, email: user.email}} 
      );
     } else {
      alert('You must be logged in to proceed to checkout.');
      navigate('/login');
    }
  };

  return (
    <div className='product-detail-container' >
        <nav className="nav-bar" style={{marginBottom : "200px"}} >
            <div className="logo">
                <h1>{user ? "Welcome to Oaksloom" : "Oaksloom"}</h1>
            </div>

            <div className="account-main">
                {user ? (
                    <div className="user-section">
                        <h1 className="welcome-text">Welcome {user.firstname}</h1>
                        <button style={{backgroundColor:"white", border: "2px solid black", color:"black"}} onClick={() => navigate("/history")}>Past orders</button>
                        {/* <button onClick={logout}>Logout</button> */}
                    </div>
                ) : (
                    <div className="auth-buttons">
                        <button onClick={() => navigate("/login")}>
                            <Link to="/login">Login</Link>
                        </button>
                        <button onClick={() => navigate("/signup")}>
                            <Link to="/signup">Create Account</Link>
                        </button>
                    </div>
                )}
            </div>
        </nav>


      <div className="image-detail-page-container" style={{marginTop:"300px"}}>
        <img src={product.image_url} alt="" />
      </div>
      <div className="product-detail-page-details">

        <div className="det-prod-item">
          <div className="prod-cat-name">
            <h3>{product.name}</h3>
            <h3 className='category' >{product.category_name}</h3>
          </div>
          <div className="prod-price">
            <h3>{product.price}</h3>
          </div>
        </div>

        <div className="order-button">
          <h3>{product.description}</h3>
          <button onClick={handleCheckout} >Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails