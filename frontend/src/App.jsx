import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from './Components/HomePage'
import Login from './Components/Login'
// import ProductLists from './Components/ProductLists'
import ProductDetails from './Components/ProductDetails'
import Signup from './Components/Signup'
import Checkout from './Components/Checkout'
import HistoryUsers from './Components/HistoryUsers'
import AdminDashboard from './Components/AdminDashboard'
import { AuthProvider } from './Context/Authcontext'
import TermsAndConditions from './Components/Terms'
import PaymentStatus from './Components/PaymentStatus'
import CheckoutError from './Components/CheckourError'
import CheckoutSuccess from './Components/CheckoutSuccess'

function App() {
  const [count, setCount] = useState(0)

  return (
        <Router>
          <AuthProvider>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<Login />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/product/:id' element={<ProductDetails />} /> 
              <Route path='/orders/:id/:lastname' element={<HistoryUsers/>} />  {/* ✅ FIXED */}
              <Route path='/api/orders' element={<AdminDashboard/>}/>
              <Route path='/terms' element={<TermsAndConditions/>}/>
              <Route path='/history' element={<HistoryUsers/>} />
              <Route path="/payment-status" element={<PaymentStatus />} />
              <Route path='/checkout-success' element={<CheckoutSuccess/>} />
              <Route path='/checkout-fails' element={<CheckoutError/>} />
            </Routes>
          </AuthProvider>

        </Router>
  )
}

export default App
