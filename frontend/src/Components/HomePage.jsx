import React, {useState, useEffect}from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../Styles/home.css'
import axios from 'axios'
import houses from './data'


import Bag from '../assets/bag-image.jpg'
import { useAuth } from '../Context/Authcontext'
import Footer from './About'
import { Hospital } from 'lucide-react'
import PaystackPayment from './PaystackPayment'


const url = 'http://127.0.0.1:5000'
const liveurl = 'https://online-store-backend-plct.onrender.com'

function HomePage() {

    const { user, logout } = useAuth();
    const navigate = useNavigate()
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const [selectedHouse, setSelectedHouse] = useState(null)
    const [contactModal, setContactModal] = useState(false)


    useEffect(() => {
        axios.get(`${liveurl}/products`)
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setError("Failed to load products. Please try again.");
            });
    }, []);

  return (
    <div className='home-container'>

        {/* Navbar in Home Page - DONE */}
        <nav className="nav-bar">
            <div className="logo">
                <h1>{user ? "Welcome to LuxMato" : "Lux mato"}</h1>
            </div>

            <div className="account-main">
                {user ? (
                    <div className="user-section">
                        <div className="user-nname">
                            <h1 className="welcome-text">Welcome {user.firstname}</h1>
                        </div>
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

        {/* Landing Page Part in Home page */}
        <div className="landing-page">

            <div className="text-part">
                <div className="text">
                    <div className="classy-text">
                    Welcome to Nairobi’s Ultimate Luxury Stay ✨ Enjoy an all-inclusive experience with world-class accommodation.
                    </div>

                    <div className="small-text">
                    spa & massage sessions three times a week, and personalized services. Indulge in fine dining, private chauffeur service, and 24/7 concierge care. Luxury redefined—because you deserve the best!                    
                    </div>
                    <div className="button-create-account">
                    <button onClick={()=> setContactModal(true)}>
                        Book now!
                    </button>
                    </div>
                </div>
            </div>

        </div>

        <div className='product-container'>
            <div className="house-grid">
                    {houses.map((house) => (   
                        <div key={house.id} className="house-card" onClick={() => setSelectedHouse(house)}  >
                            <img
                                src={house.images.sitting}
                                alt="House"
                            />


                            <div className="house-details">
                                <h2>{house.location}</h2>
                                <p>${house.price}/night</p>
                            </div>
                        </div>
                    ))}

                    {selectedHouse && (
                        <ImageModal house={selectedHouse} onClose={() => setSelectedHouse(null)} email={user?.email} />
                    )}
            </div>


        </div>
        <Footer/>

    </div>
  )
}



const ImageModal = ({ house, onClose, email }) => {

    const navigate = useNavigate()
    const {user} = useAuth()
    // useEffect(()=>{
    //     if(!user){
    //         navigate('/signup')
    //     }
    // })

  const imageKeys = ["sitting", "kitchen", "bed"];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % imageKeys.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + imageKeys.length) % imageKeys.length);
  };


  const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ""); // YYYYMMDDHHMMSS format
  const orderId = `ORDER-2-${timestamp}`;

  const handlePesapalPayment = async ()=>{
    try {
        const response = await axios.post(`${liveurl}/api/payment-process`, {email: "mixholdingslimited@gmail.com", totalPrice: house.price, firstname: "Nim",  lastname: "Don", reference: orderId, id: 9, productName: "Payment for Suites"})
        if(response.status == 200){
            window.location.href = response.data.redirect_url
          }
    } catch (error) {
        console.error("error from payment", error)
    }
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>✖</span>
        <img src={house.images[imageKeys[currentIndex]]} alt="Room" />
        <h4>{house.location}</h4>
        <div className="modal-buttons">
          {/* <PaystackPayment email={email} amount={house.price} /> */}
          <button onClick={handlePesapalPayment}> Pay </button>
          <button onClick={handlePrev}>⬅ Prev</button>
          <button onClick={handleNext}>Next ➡</button>
        </div>
      </div>
    </div>
  );
};



export default HomePage









// //                {error ? (
//     <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
// ) : (
//     <div className="items">
//         {products.map(product => (
//             <div key={product.id} className='inside-item-container'>
//                 <div className="image-container">
//                     <img src={product.image_url} alt={product.name} />
//                 </div>
//                 <div className="item-details">
//                     <h3>{product.name}</h3>
//                     <h4>${product.price.toFixed(2)}</h4>
//                 </div>
//                 <div className="item-description">
//                   <h4> {product.description} </h4>
//                 </div>
//                 <div className="link" onClick={() => navigate(`/product/${product.id}`)} >
//                     <p>Click here to view more and order here!</p>
//                 </div>
//             </div>
//         ))}
//     </div>
// )}