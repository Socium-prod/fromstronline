import React, {useState} from 'react';
import { useForm  } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import '../Styles/signup.css';
import axios from 'axios';
import { useAuth } from '../Context/Authcontext';

const url = 'http://127.0.0.1:5000'
const liveurl = 'https://online-store-backend-plct.onrender.com'

function Signup() {
  // Initialize useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Access the password field value for comparison
  const password = watch('password');
  const navigate = useNavigate()
  const {signup} = useAuth()
  const [loading, setLoading] = useState(false)
  // Handle form submission
  const onSubmit = (data) => {
    console.log(data)
    setLoading(true)
    signup(data.email, data.password, data.firstname, data.lastname)  
    setLoading(false)    
    // Navigate to /products and pass name and id as state
    alert(`Signing up with:\nFirst Name: ${data.firstname}\nLast Name: ${data.lastname}\nEmail: ${data.email}`);
  };

  return (
    <div className="signup-container">

      <div className="signup-form-container">
        <form onSubmit={handleSubmit(onSubmit)} className="inner-signup-form-container">
          <div className="signup-header">
            <h1>Create Account</h1>
          </div>
          {/* First Name Field */}
          <div className='names-container' >
            <input
              type="text"
              {...register('firstname', {
                required: 'First name is required',
                minLength: {
                  value: 2,
                  message: 'First name must be at least 2 characters',
                },
              })}
              placeholder='First Name'
            />
          
          {errors.firstname && <p style={{ color: 'red' }}>{errors.firstname.message}</p>}

          {/* Last Name Field */}
        
            
            <input
              type="text"
              {...register('lastname', {
                required: 'Last name is required',
                minLength: {
                  value: 2,
                  message: 'Last name must be at least 2 characters',
                },
              })}
              placeholder='Last name'
            />
          </div>
          {errors.lastname && <p style={{ color: 'red' }}>{errors.lastname.message}</p>}

          {/* Email Field */}
          <div className='signup-email-container' >
            <input
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
              placeholder='Enter your email'
            />
          </div>
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

          {/* Password Field */}
          <div className='signup-password-container' >
            <input
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              placeholder='Create password'
            />
          </div>
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

          {/* Confirm Password Field */}
          <div className='confirm-password-container' >
            <input
              type="password"
              {...register('confirmPassword', {
                required: 'Confirm password is required',
                validate: (value) => value === password || 'Passwords do not match',
              })}
              placeholder='Confirm Password'
            />
          </div>
          {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword.message}</p>}

          {/* Submit Button */}
          <button type="submit">{loading ? 'Creating account...': "Signup"}</button>

          {/* Link to Login Page */}
          <div className="login-navigate">
              <p className="login-link">
                Already have an account? {' '}
                {/* <a href="/login">Login here</a> */}
                <Link to='/login' >Login here</Link>
              </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;