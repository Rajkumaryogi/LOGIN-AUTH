import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';


const Login = () => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target; // Extract name and value from input
    console.log(name, value); // Print the name and value
  
    setLoginInfo((prevState) => ({        // Update the state
      ...prevState,  // Keep the existing values
      [name]: value  // Update the specific field
    }));
  }
  
  // console.log('loginInfo -> ', signupInfo);

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      alert('Email and password are required');
      // return handleError('email and password are required')
      return ;
    }
    try {
      const url = 'https://auth-login-backend.vercel.app/auth/login';
      const response = await fetch( url , {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginInfo)
      });
      const result = await response.json();
      const {success, message,jwtToken,name, error} = result;
      console.log('data -> ', result);
      if (success===true) {
        localStorage.setItem('jwtToken', jwtToken);
        localStorage.setItem('loggedInUser', name);
        setTimeout(() => {
          alert(result.message);
          navigate('/Home');
        }, 1000);
        // window.location.href = '/Home';
        return ;
      }else
      if (error) {
        alert(result.error.details[0].message);
        // return handleError(data.error);
      }
       else {
        alert(message);
        // return handleError(data.message);
      }
    }
    catch (err) {
      console.log('Error -> ', err);
      // return handleError('Error occurred. Please try again');
    }
  };
  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input 
           onChange={handleChange}
           type='email' 
           name ='email' 
           placeholder='Enter your email...' 
           value={loginInfo.email}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input 
           onChange={handleChange}
           type='password' 
           name ='password' 
           placeholder='Enter your password...' 
           value={loginInfo.password}
          />
        </div>
        <button type='submit'>Login </button>
         <span>Don't have an account? 
           <Link to ='/Signup'>Signup here
           </Link>
         </span>
      </form>
      
    </div>
  )
}

export default Login
