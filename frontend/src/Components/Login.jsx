import React, { useContext, useState } from 'react'
import axios from 'axios';
import { useNavigate , Link} from 'react-router-dom';
import '../Styles/login.css'
import { useForm } from 'react-hook-form'; 
import { useAuth } from '../Context/Authcontext';
import { style } from 'framer-motion/client';
function Login() {

  const { login } = useAuth()

  const {register, handleSubmit, formState: {errors} } = useForm()
  const navigate = useNavigate()
  const [Loading, setLoading] = useState(false)
  
  const onSubmit = async (data)=>{
    setLoading(true)
    await login(data.email, data.password)
    setLoading(false)
  }

  return (
    <div className='login-page-container'>
      <div className="login-form-container">
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
          {/* Email Field */}
          <div className='email-container' >
            <label name="email">Email:</label>
            <input
              placeholder='Enter your email'
              type="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: 'Invalid email format',
                },
              })}
            />
          </div>
          {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}

          {/* Password Field */}
          <div className='password-container' >
            <label name="password" htmlFor="email">Password:</label>
            <input
              placeholder='Enter your password'
              type="password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </div>
          {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}

          {/* Submit Button */}
          <button type="submit" disabled={Loading} style={Loading ? {background: "gray"} : {background: "black"}}  >{Loading ? "Loading..." : "Login"}</button>
          <div className="login-navigate">
              <p className="login-link">
                Dont have an account? {' '}
                {/* <a href="/signup">Create account here</a> */}
                <Link to='/signup' > Create Account here </Link>
              </p>
          </div>
        </form>

      </div>
    </div>
  )
}

export default Login